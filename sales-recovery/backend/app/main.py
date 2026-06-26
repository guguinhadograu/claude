from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from contextlib import asynccontextmanager

from app.models.database import init_db
from app.api import leads, recovery, calls, webhook
from app.services.file_storage import AUDIO_DIR


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    AUDIO_DIR.mkdir(exist_ok=True)
    yield


app = FastAPI(
    title="Sales Recovery AI Agent",
    description="Recuperação de vendas com IA — áudio + ligações via Twilio e Claude",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leads.router)
app.include_router(recovery.router)
app.include_router(calls.router)
app.include_router(webhook.router)

app.mount("/audio", StaticFiles(directory=str(AUDIO_DIR)), name="audio")
app.mount("/", StaticFiles(directory="../frontend/dist", html=True), name="frontend")
