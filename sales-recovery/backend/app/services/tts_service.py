import httpx
import boto3
import tempfile
import os
from pathlib import Path

from app.config import get_settings


async def generate_audio_elevenlabs(text: str, output_path: str) -> str:
    settings = get_settings()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{settings.elevenlabs_voice_id}"
    headers = {
        "xi-api-key": settings.elevenlabs_api_key,
        "Content-Type": "application/json",
    }
    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
    }
    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(url, headers=headers, json=payload)
        resp.raise_for_status()
        Path(output_path).write_bytes(resp.content)
    return output_path


def generate_audio_polly(text: str, output_path: str) -> str:
    settings = get_settings()
    client = boto3.client(
        "polly",
        region_name=settings.aws_region,
        aws_access_key_id=settings.aws_access_key_id or None,
        aws_secret_access_key=settings.aws_secret_access_key or None,
    )
    response = client.synthesize_speech(
        Text=text,
        OutputFormat="mp3",
        VoiceId="Camila",
        LanguageCode="pt-BR",
        Engine="neural",
    )
    with open(output_path, "wb") as f:
        f.write(response["AudioStream"].read())
    return output_path


async def text_to_speech(text: str) -> str:
    settings = get_settings()
    suffix = ".mp3"
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix, dir="/tmp")
    tmp.close()
    output_path = tmp.name

    if settings.elevenlabs_api_key:
        await generate_audio_elevenlabs(text, output_path)
    else:
        generate_audio_polly(text, output_path)

    return output_path
