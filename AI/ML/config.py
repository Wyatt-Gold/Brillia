"""Configuration module for ML service.

Reads environment variables with sensible defaults for OpenAI integration
and response generation settings.
"""

import os

# Load .env file if python-dotenv is available
try:
    from dotenv import load_dotenv
    load_dotenv()  # Loads .env from current directory or parent directories
except ImportError:
    pass  # python-dotenv not installed, skip .env loading

# Environment variable names
ENV_ENABLE_OPENAI = "ML_ENABLE_OPENAI"
ENV_OPENAI_API_KEY = "OPENAI_API_KEY"
ENV_OPENAI_MODEL = "ML_OPENAI_MODEL"
ENV_OPENAI_TIMEOUT = "ML_OPENAI_TIMEOUT"
ENV_MAX_CONTEXT_CHARS = "ML_MAX_CONTEXT_CHARS"


def _parse_bool_env(value: str | None, default: bool = True) -> bool:
    """Parse a boolean environment variable (case-insensitive, truthy strings)."""
    if value is None:
        return default
    return value.lower() in ("true", "1", "yes", "on")


def _parse_float_env(value: str | None, default: float) -> float:
    """Parse a float environment variable."""
    if value is None:
        return default
    try:
        return float(value)
    except ValueError:
        return default


def _parse_int_env(value: str | None, default: int) -> int:
    """Parse an int environment variable."""
    if value is None:
        return default
    try:
        return int(value)
    except ValueError:
        return default


# Read and expose configuration constants
ENABLE_OPENAI: bool = _parse_bool_env(os.getenv(ENV_ENABLE_OPENAI), default=True)
OPENAI_API_KEY: str | None = os.getenv(ENV_OPENAI_API_KEY)
OPENAI_MODEL: str = os.getenv(ENV_OPENAI_MODEL, "gpt-4o-mini")
OPENAI_TIMEOUT: float = _parse_float_env(os.getenv(ENV_OPENAI_TIMEOUT), default=20.0)
MAX_CONTEXT_CHARS: int = _parse_int_env(os.getenv(ENV_MAX_CONTEXT_CHARS), default=6000)

