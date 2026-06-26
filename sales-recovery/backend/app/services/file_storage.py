"""Simple file hosting: serves audio files via FastAPI static files."""
import shutil
import uuid
from pathlib import Path

AUDIO_DIR = Path("./audio_files")
AUDIO_DIR.mkdir(exist_ok=True)


def save_audio_file(source_path: str) -> str:
    """Move temp audio file to static dir. Returns filename."""
    filename = f"{uuid.uuid4()}.mp3"
    dest = AUDIO_DIR / filename
    shutil.move(source_path, dest)
    return filename


def get_audio_url(filename: str, base_url: str) -> str:
    return f"{base_url}/audio/{filename}"
