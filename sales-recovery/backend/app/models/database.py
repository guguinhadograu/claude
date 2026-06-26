from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import String, Float, DateTime, Enum, Text, ForeignKey, JSON
from datetime import datetime
from typing import Optional
import enum

from app.config import get_settings


class Base(DeclarativeBase):
    pass


class LeadStatus(str, enum.Enum):
    new = "new"
    contacted = "contacted"
    recovered = "recovered"
    lost = "lost"
    do_not_contact = "do_not_contact"


class ContactMethod(str, enum.Enum):
    whatsapp_audio = "whatsapp_audio"
    whatsapp_text = "whatsapp_text"
    phone_call = "phone_call"
    sms = "sms"


class ContactResult(str, enum.Enum):
    sent = "sent"
    answered = "answered"
    no_answer = "no_answer"
    failed = "failed"
    recovered = "recovered"
    rejected = "rejected"


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    phone: Mapped[str] = mapped_column(String(30))
    email: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    product: Mapped[Optional[str]] = mapped_column(String(300), nullable=True)
    cart_value: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    abandonment_reason: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    extra_data: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    status: Mapped[LeadStatus] = mapped_column(Enum(LeadStatus), default=LeadStatus.new)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    contacts: Mapped[list["ContactLog"]] = relationship("ContactLog", back_populates="lead")


class ContactLog(Base):
    __tablename__ = "contact_logs"

    id: Mapped[int] = mapped_column(primary_key=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey("leads.id"))
    method: Mapped[ContactMethod] = mapped_column(Enum(ContactMethod))
    result: Mapped[ContactResult] = mapped_column(Enum(ContactResult))
    ai_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    audio_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    twilio_sid: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    agent_reasoning: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    lead: Mapped["Lead"] = relationship("Lead", back_populates="contacts")


engine = create_async_engine(get_settings().database_url, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
