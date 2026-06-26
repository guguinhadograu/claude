from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.models.database import Lead, ContactLog, LeadStatus, get_db

router = APIRouter(prefix="/api/leads", tags=["leads"])


class LeadCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    product: Optional[str] = None
    cart_value: Optional[float] = None
    abandonment_reason: Optional[str] = None
    extra_data: Optional[dict] = None


class LeadUpdate(BaseModel):
    status: Optional[LeadStatus] = None
    product: Optional[str] = None
    cart_value: Optional[float] = None
    abandonment_reason: Optional[str] = None


@router.post("/")
async def create_lead(data: LeadCreate, db: AsyncSession = Depends(get_db)):
    lead = Lead(**data.model_dump())
    db.add(lead)
    await db.commit()
    await db.refresh(lead)
    return lead


@router.get("/")
async def list_leads(
    status: Optional[LeadStatus] = None,
    skip: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
):
    q = select(Lead).order_by(Lead.created_at.desc()).offset(skip).limit(limit)
    if status:
        q = q.where(Lead.status == status)
    result = await db.execute(q)
    return result.scalars().all()


@router.get("/stats")
async def get_stats(db: AsyncSession = Depends(get_db)):
    total = await db.scalar(select(func.count(Lead.id)))
    recovered = await db.scalar(select(func.count(Lead.id)).where(Lead.status == LeadStatus.recovered))
    contacted = await db.scalar(select(func.count(Lead.id)).where(Lead.status == LeadStatus.contacted))
    total_value = await db.scalar(
        select(func.sum(Lead.cart_value)).where(Lead.status == LeadStatus.recovered)
    )
    contacts_sent = await db.scalar(select(func.count(ContactLog.id)))
    return {
        "total_leads": total or 0,
        "recovered": recovered or 0,
        "contacted": contacted or 0,
        "recovery_rate": round((recovered / total * 100) if total else 0, 1),
        "recovered_value": round(total_value or 0, 2),
        "contacts_sent": contacts_sent or 0,
    }


@router.get("/{lead_id}")
async def get_lead(lead_id: int, db: AsyncSession = Depends(get_db)):
    lead = await db.get(Lead, lead_id)
    if not lead:
        raise HTTPException(404, "Lead not found")
    return lead


@router.patch("/{lead_id}")
async def update_lead(lead_id: int, data: LeadUpdate, db: AsyncSession = Depends(get_db)):
    lead = await db.get(Lead, lead_id)
    if not lead:
        raise HTTPException(404, "Lead not found")
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(lead, field, value)
    await db.commit()
    await db.refresh(lead)
    return lead


@router.get("/{lead_id}/contacts")
async def get_lead_contacts(lead_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(ContactLog).where(ContactLog.lead_id == lead_id).order_by(ContactLog.created_at.desc())
    )
    return result.scalars().all()
