from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    anthropic_api_key: str
    twilio_account_sid: str
    twilio_auth_token: str
    twilio_phone_number: str
    twilio_whatsapp_number: str = "whatsapp:+14155238886"
    elevenlabs_api_key: str = ""
    elevenlabs_voice_id: str = "21m00Tcm4TlvDq8ikWAM"
    app_url: str = "http://localhost:8000"
    secret_key: str = "change-me"
    database_url: str = "sqlite+aiosqlite:///./sales_recovery.db"
    redis_url: str = "redis://localhost:6379/0"
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""
    aws_region: str = "us-east-1"

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()
