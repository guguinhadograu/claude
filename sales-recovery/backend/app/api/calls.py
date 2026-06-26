"""Twilio webhook endpoints for call status and TwiML serving."""
from fastapi import APIRouter, Request, Form
from fastapi.responses import Response
from pathlib import Path

from app.services.twilio_service import build_voice_twiml
from app.services.file_storage import AUDIO_DIR

router = APIRouter(prefix="/api/calls", tags=["calls"])


@router.get("/twiml/{filename}")
async def serve_twiml(filename: str):
    """Return TwiML that plays the pre-generated audio file."""
    from app.config import get_settings
    audio_url = f"{get_settings().app_url}/audio/{filename}"
    twiml = build_voice_twiml("", audio_url=audio_url)
    return Response(content=twiml, media_type="application/xml")


@router.post("/status")
async def call_status(
    CallSid: str = Form(...),
    CallStatus: str = Form(...),
    To: str = Form(...),
):
    """Handle Twilio call status webhooks."""
    from app.models.database import AsyncSessionLocal, ContactLog, ContactResult
    from sqlalchemy import select

    async with AsyncSessionLocal() as db:
        result = await db.execute(select(ContactLog).where(ContactLog.twilio_sid == CallSid))
        log = result.scalar_one_or_none()
        if log:
            status_map = {
                "completed": ContactResult.answered,
                "no-answer": ContactResult.no_answer,
                "busy": ContactResult.no_answer,
                "failed": ContactResult.failed,
                "canceled": ContactResult.failed,
            }
            log.result = status_map.get(CallStatus, log.result)
            await db.commit()

    return {"received": True}
