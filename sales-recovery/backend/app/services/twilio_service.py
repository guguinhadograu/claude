import asyncio
from pathlib import Path
from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse, Say, Play

from app.config import get_settings


def get_twilio_client() -> Client:
    s = get_settings()
    return Client(s.twilio_account_sid, s.twilio_auth_token)


async def send_whatsapp_audio(to_number: str, audio_url: str, caption: str = "") -> str:
    """Send audio file via WhatsApp. Returns message SID."""
    s = get_settings()
    client = get_twilio_client()

    to = f"whatsapp:{to_number}" if not to_number.startswith("whatsapp:") else to_number

    loop = asyncio.get_event_loop()
    msg = await loop.run_in_executor(
        None,
        lambda: client.messages.create(
            from_=s.twilio_whatsapp_number,
            to=to,
            media_url=[audio_url],
            body=caption,
        ),
    )
    return msg.sid


async def send_whatsapp_text(to_number: str, text: str) -> str:
    s = get_settings()
    client = get_twilio_client()

    to = f"whatsapp:{to_number}" if not to_number.startswith("whatsapp:") else to_number

    loop = asyncio.get_event_loop()
    msg = await loop.run_in_executor(
        None,
        lambda: client.messages.create(
            from_=s.twilio_whatsapp_number,
            to=to,
            body=text,
        ),
    )
    return msg.sid


async def make_phone_call(to_number: str, twiml_url: str) -> str:
    """Initiate outbound phone call. twiml_url should return TwiML."""
    s = get_settings()
    client = get_twilio_client()

    loop = asyncio.get_event_loop()
    call = await loop.run_in_executor(
        None,
        lambda: client.calls.create(
            to=to_number,
            from_=s.twilio_phone_number,
            url=twiml_url,
            status_callback=f"{s.app_url}/api/calls/status",
            status_callback_method="POST",
        ),
    )
    return call.sid


def build_voice_twiml(message: str, audio_url: str | None = None) -> str:
    response = VoiceResponse()
    if audio_url:
        response.play(audio_url)
    else:
        response.say(message, language="pt-BR", voice="Polly.Camila")
    return str(response)
