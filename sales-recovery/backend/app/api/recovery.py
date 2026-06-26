"""Recovery execution endpoint — runs the AI agent for a lead."""
import os
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.database import Lead, ContactLog, ContactMethod, ContactResult, LeadStatus, get_db
from app.agents.sales_agent import run_recovery_agent
from app.services.tts_service import text_to_speech
from app.services.twilio_service import send_whatsapp_audio, send_whatsapp_text, make_phone_call, build_voice_twiml
from app.services.file_storage import save_audio_file, get_audio_url
from app.config import get_settings

router = APIRouter(prefix="/api/recovery", tags=["recovery"])


async def _execute_recovery(lead_id: int):
    from app.models.database import AsyncSessionLocal
    async with AsyncSessionLocal() as db:
        lead = await db.get(Lead, lead_id)
        if not lead or lead.status == LeadStatus.do_not_contact:
            return

        contacts_result = await db.execute(
            select(ContactLog).where(ContactLog.lead_id == lead_id).order_by(ContactLog.created_at.desc())
        )
        contacts = contacts_result.scalars().all()
        contact_history = [
            {
                "created_at": str(c.created_at),
                "method": c.method.value,
                "result": c.result.value,
                "ai_message": c.ai_message,
            }
            for c in contacts
        ]

        lead_data = {
            "name": lead.name,
            "phone": lead.phone,
            "email": lead.email,
            "product": lead.product,
            "cart_value": lead.cart_value or 0,
            "abandonment_reason": lead.abandonment_reason,
            "extra_data": lead.extra_data,
        }

        result = await run_recovery_agent(lead_data, contact_history)
        action = result["action"]
        tool_input = result["tool_input"]
        reasoning = result["reasoning"]

        settings = get_settings()
        log = ContactLog(
            lead_id=lead_id,
            agent_reasoning=reasoning[:2000] if reasoning else None,
        )

        if action == "send_whatsapp_audio":
            script = tool_input["script"]
            caption = tool_input.get("caption", "")
            audio_path = await text_to_speech(script)
            filename = save_audio_file(audio_path)
            audio_url = get_audio_url(filename, settings.app_url)
            try:
                sid = await send_whatsapp_audio(lead.phone, audio_url, caption)
                log.method = ContactMethod.whatsapp_audio
                log.result = ContactResult.sent
                log.ai_message = script
                log.audio_url = audio_url
                log.twilio_sid = sid
            except Exception as e:
                log.method = ContactMethod.whatsapp_audio
                log.result = ContactResult.failed
                log.ai_message = f"Error: {e}"

        elif action == "send_whatsapp_text":
            message = tool_input["message"]
            try:
                sid = await send_whatsapp_text(lead.phone, message)
                log.method = ContactMethod.whatsapp_text
                log.result = ContactResult.sent
                log.ai_message = message
                log.twilio_sid = sid
            except Exception as e:
                log.method = ContactMethod.whatsapp_text
                log.result = ContactResult.failed
                log.ai_message = f"Error: {e}"

        elif action == "make_phone_call":
            call_script = tool_input["call_script"]
            audio_path = await text_to_speech(call_script)
            filename = save_audio_file(audio_path)
            audio_url = get_audio_url(filename, settings.app_url)
            twiml_url = f"{settings.app_url}/api/calls/twiml/{filename}"
            try:
                sid = await make_phone_call(lead.phone, twiml_url)
                log.method = ContactMethod.phone_call
                log.result = ContactResult.sent
                log.ai_message = call_script
                log.audio_url = audio_url
                log.twilio_sid = sid
            except Exception as e:
                log.method = ContactMethod.phone_call
                log.result = ContactResult.failed
                log.ai_message = f"Error: {e}"

        else:  # skip_contact
            log.method = ContactMethod.whatsapp_text
            log.result = ContactResult.failed
            log.ai_message = tool_input.get("reason", "Skipped by agent")

        if lead.status == LeadStatus.new:
            lead.status = LeadStatus.contacted

        db.add(log)
        await db.commit()


@router.post("/{lead_id}")
async def trigger_recovery(lead_id: int, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    lead = await db.get(Lead, lead_id)
    if not lead:
        raise HTTPException(404, "Lead not found")
    if lead.status == LeadStatus.do_not_contact:
        raise HTTPException(400, "Lead opted out of contact")

    background_tasks.add_task(_execute_recovery, lead_id)
    return {"status": "queued", "lead_id": lead_id}


@router.post("/bulk/all-new")
async def trigger_all_new(background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Lead).where(Lead.status == LeadStatus.new))
    leads = result.scalars().all()
    for lead in leads:
        background_tasks.add_task(_execute_recovery, lead.id)
    return {"status": "queued", "count": len(leads)}
