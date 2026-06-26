"""Webhook endpoint for receiving abandoned cart events from e-commerce platforms."""
from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.database import Lead, LeadStatus, get_db

router = APIRouter(prefix="/api/webhook", tags=["webhook"])


class AbandonedCartPayload(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    product: Optional[str] = None
    cart_value: Optional[float] = None
    abandonment_reason: Optional[str] = None
    extra_data: Optional[dict] = None


@router.post("/abandoned-cart")
async def abandoned_cart(payload: AbandonedCartPayload, db: AsyncSession = Depends(get_db)):
    """
    Receive abandoned cart events from your e-commerce platform.
    Creates a new lead if phone number not already tracked.
    """
    existing = await db.execute(select(Lead).where(Lead.phone == payload.phone))
    lead = existing.scalar_one_or_none()

    if lead:
        if lead.status in (LeadStatus.recovered, LeadStatus.do_not_contact):
            return {"status": "skipped", "reason": lead.status.value}
        lead.product = payload.product or lead.product
        lead.cart_value = payload.cart_value or lead.cart_value
        lead.abandonment_reason = payload.abandonment_reason
        lead.extra_data = payload.extra_data
        lead.status = LeadStatus.new
    else:
        lead = Lead(**payload.model_dump())
        db.add(lead)

    await db.commit()
    await db.refresh(lead)
    return {"status": "created", "lead_id": lead.id}
