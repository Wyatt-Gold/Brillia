"""Response generation module with OpenAI integration and rule-based fallback."""

import logging
from typing import Any

from ..config import (
    ENABLE_OPENAI,
    MAX_CONTEXT_CHARS,
    OPENAI_API_KEY,
    OPENAI_MODEL,
    OPENAI_TIMEOUT,
)
from ..models.retrieval_types import RetrievedChunk

logger = logging.getLogger(__name__)


class ResponseGenerator:
    """Generates responses using OpenAI API with rule-based fallback.

    The generator attempts to use OpenAI Chat Completions API when enabled
    and configured. If OpenAI is unavailable or errors occur, it falls back
    to a deterministic rule-based response strategy.
    """

    def __init__(
        self,
        enable_openai: bool | None = None,
        model: str | None = None,
        openai_client: Any | None = None,
    ) -> None:
        """Initialize the response generator.

        Args:
            enable_openai: Override config to enable/disable OpenAI. If None, uses config.
            model: Override OpenAI model name. If None, uses config.
            openai_client: Inject an OpenAI client instance. If None, creates one if enabled.
        """
        self._enable_openai = enable_openai if enable_openai is not None else ENABLE_OPENAI
        self._model = model if model is not None else OPENAI_MODEL
        self._openai_client = openai_client
        self._client_initialized = False

    def _get_openai_client(self) -> Any | None:
        """Get or create OpenAI client if enabled and API key is available."""
        if not self._enable_openai:
            return None

        if self._openai_client is not None:
            return self._openai_client

        if not self._client_initialized:
            self._client_initialized = True
            if not OPENAI_API_KEY:
                logger.warning("OpenAI is enabled but OPENAI_API_KEY is not set")
                return None

            try:
                from openai import OpenAI

                self._openai_client = OpenAI(api_key=OPENAI_API_KEY, timeout=OPENAI_TIMEOUT)
                return self._openai_client
            except ImportError:
                logger.warning("OpenAI package not installed, falling back to rule-based")
                return None
            except Exception as e:
                logger.warning(f"Failed to initialize OpenAI client: {e}, falling back to rule-based")
                return None

        return self._openai_client

    def _build_context_from_chunks(self, retrieved_chunks: list[RetrievedChunk] | None) -> str:
        """Build a compact context string from retrieved chunks."""
        if not retrieved_chunks:
            return ""

        context_parts = []
        total_chars = 0

        for chunk in retrieved_chunks:
            chunk_text = chunk.content.strip()
            if not chunk_text:
                continue

            if total_chars + len(chunk_text) > MAX_CONTEXT_CHARS:
                remaining = MAX_CONTEXT_CHARS - total_chars
                if remaining > 50:  # Only add if meaningful space remains
                    context_parts.append(chunk_text[:remaining] + "...")
                break

            context_parts.append(chunk_text)
            total_chars += len(chunk_text)

        return "\n\n".join(context_parts)

    def _generate_with_openai(
        self, query: str, context: str, system_prompt: str | None
    ) -> str | None:
        """Attempt to generate response using OpenAI API.

        Returns:
            Generated response string if successful, None if should fallback.
        """
        client = self._get_openai_client()
        if not client:
            return None

        # Build messages
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        else:
            messages.append(
                {
                    "role": "system",
                    "content": "You are a helpful educational assistant. Answer questions based on the provided context. If the context doesn't contain enough information, say so politely.",
                }
            )

        user_content = query
        if context:
            user_content = f"Context:\n{context}\n\nQuestion: {query}"

        messages.append({"role": "user", "content": user_content})

        try:
            response = client.chat.completions.create(
                model=self._model,
                messages=messages,
                timeout=OPENAI_TIMEOUT,
            )
            content = response.choices[0].message.content
            # Return None if content is empty/None to trigger fallback
            if not content or not content.strip():
                logger.warning("OpenAI returned empty content, falling back to rule-based")
                return None
            return content
        except Exception as e:
            logger.warning(f"OpenAI API call failed: {e}, falling back to rule-based")
            return None

    def _generate_rule_based(
        self, query: str, retrieved_chunks: list[RetrievedChunk] | None
    ) -> str:
        """Generate a rule-based response as fallback.

        This is deterministic and safe for testing.
        """
        if not retrieved_chunks:
            return (
                "I don't have enough information to answer that question. "
                "Could you please rephrase your question or provide more details?"
            )

        # Extract key information from chunks
        chunk_contents = [chunk.content.strip() for chunk in retrieved_chunks if chunk.content.strip()]
        if not chunk_contents:
            return (
                "I don't have enough information to answer that question. "
                "Could you please rephrase your question or provide more details?"
            )

        # Collect unique source IDs (up to 2)
        source_ids = []
        for chunk in retrieved_chunks:
            if chunk.source_id and chunk.source_id not in source_ids:
                source_ids.append(chunk.source_id)
                if len(source_ids) >= 2:
                    break

        # Build a simple synthesis
        main_content = chunk_contents[0]
        if len(chunk_contents) > 1:
            # Combine first two chunks if available
            combined = " ".join(chunk_contents[:2])
            if len(combined) <= 300:  # Keep it concise
                main_content = combined

        # Create response
        response = f"Based on the available information: {main_content}"

        if source_ids:
            sources_text = ", ".join(source_ids)
            response += f"\n\n(Source: {sources_text})"

        return response

    def generate_response(
        self,
        query: str,
        retrieved_chunks: list[RetrievedChunk] | None = None,
        system_prompt: str | None = None,
    ) -> str:
        """Generate a response to a query using retrieved chunks.

        Args:
            query: The user's question or query.
            retrieved_chunks: List of retrieved chunks from vector database.
            system_prompt: Optional custom system prompt for OpenAI.

        Returns:
            Generated response string.
        """
        if not query or not query.strip():
            return "Please provide a valid question."

        context = self._build_context_from_chunks(retrieved_chunks)

        # Try OpenAI first if enabled
        if self._enable_openai:
            openai_response = self._generate_with_openai(query, context, system_prompt)
            if openai_response is not None:
                return openai_response

        # Fallback to rule-based
        return self._generate_rule_based(query, retrieved_chunks)


def generate_response(
    query: str,
    retrieved_chunks: list[RetrievedChunk] | None = None,
    system_prompt: str | None = None,
) -> str:
    """Convenience function to generate a response with default settings.

    Args:
        query: The user's question or query.
        retrieved_chunks: List of retrieved chunks from vector database.
        system_prompt: Optional custom system prompt for OpenAI.

    Returns:
        Generated response string.
    """
    generator = ResponseGenerator()
    return generator.generate_response(query, retrieved_chunks, system_prompt)

