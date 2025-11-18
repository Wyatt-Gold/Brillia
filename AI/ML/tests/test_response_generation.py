"""Unit tests for response generation module."""

import os
from unittest.mock import MagicMock, patch

import pytest

from ..generation.response_generation import ResponseGenerator, generate_response
from ..models.retrieval_types import RetrievedChunk


class TestResponseGeneratorRuleBased:
    """Test rule-based fallback behavior."""

    def test_rule_based_with_chunks(self):
        """Test rule-based generation when OpenAI is disabled."""
        generator = ResponseGenerator(enable_openai=False)

        chunks = [
            RetrievedChunk(
                content="Photosynthesis is the process by which plants convert light energy into chemical energy.",
                source_id="lesson-42",
            ),
            RetrievedChunk(
                content="Chlorophyll is the green pigment that captures light.",
                source_id="lesson-42",
            ),
        ]

        response = generator.generate_response("How does photosynthesis work?", chunks)

        assert response
        assert "photosynthesis" in response.lower() or "light" in response.lower()
        assert "lesson-42" in response

    def test_rule_based_no_chunks(self):
        """Test rule-based generation when no chunks are provided."""
        generator = ResponseGenerator(enable_openai=False)

        response = generator.generate_response("What is quantum physics?")

        assert response
        assert "don't have enough information" in response.lower() or "rephrase" in response.lower()

    def test_rule_based_empty_query(self):
        """Test handling of empty query."""
        generator = ResponseGenerator(enable_openai=False)

        response = generator.generate_response("")
        assert response == "Please provide a valid question."

        response = generator.generate_response("   ")
        assert response == "Please provide a valid question."

    def test_rule_based_multiple_source_ids(self):
        """Test that rule-based response includes up to 2 source IDs."""
        generator = ResponseGenerator(enable_openai=False)

        chunks = [
            RetrievedChunk(content="First chunk", source_id="lesson-1"),
            RetrievedChunk(content="Second chunk", source_id="lesson-2"),
            RetrievedChunk(content="Third chunk", source_id="lesson-3"),
        ]

        response = generator.generate_response("Test question", chunks)

        # Should include at most 2 source IDs
        assert "lesson-1" in response or "lesson-2" in response
        # Should not include lesson-3 (third one)
        assert "lesson-3" not in response


class TestResponseGeneratorOpenAI:
    """Test OpenAI integration and fallback behavior."""

    @patch.dict(os.environ, {"OPENAI_API_KEY": ""}, clear=False)
    def test_openai_enabled_but_no_api_key(self):
        """Test graceful fallback when OpenAI is enabled but API key is missing."""
        generator = ResponseGenerator(enable_openai=True)

        chunks = [RetrievedChunk(content="Test content", source_id="test-1")]

        # Should not raise, should fallback to rule-based
        response = generator.generate_response("Test question", chunks)

        assert response
        assert "Test content" in response or "test-1" in response

    def test_openai_client_injection_and_error_handling(self):
        """Test that injected mock client errors trigger fallback."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.side_effect = Exception("API Error")

        generator = ResponseGenerator(enable_openai=True, openai_client=mock_client)

        chunks = [RetrievedChunk(content="Fallback content", source_id="fallback-1")]

        response = generator.generate_response("Test question", chunks)

        # Should fallback to rule-based
        assert response
        assert "Fallback content" in response or "fallback-1" in response

    def test_openai_successful_response(self):
        """Test successful OpenAI API call."""
        mock_client = MagicMock()
        mock_response = MagicMock()
        mock_response.choices = [MagicMock()]
        mock_response.choices[0].message.content = "This is an AI-generated response."
        mock_client.chat.completions.create.return_value = mock_response

        generator = ResponseGenerator(enable_openai=True, openai_client=mock_client)

        chunks = [RetrievedChunk(content="Context content")]

        response = generator.generate_response("Test question", chunks)

        assert response == "This is an AI-generated response."
        mock_client.chat.completions.create.assert_called_once()

    def test_openai_empty_response_fallback(self):
        """Test fallback when OpenAI returns empty content."""
        mock_client = MagicMock()
        mock_response = MagicMock()
        mock_response.choices = [MagicMock()]
        mock_response.choices[0].message.content = None
        mock_client.chat.completions.create.return_value = mock_response

        generator = ResponseGenerator(enable_openai=True, openai_client=mock_client)

        chunks = [RetrievedChunk(content="Fallback content")]

        response = generator.generate_response("Test question", chunks)

        # Should fallback when OpenAI returns None/empty
        assert response
        assert "Fallback content" in response


class TestConvenienceFunction:
    """Test the top-level generate_response convenience function."""

    def test_convenience_function_with_chunks(self):
        """Test the convenience function works with chunks."""
        chunks = [RetrievedChunk(content="Test answer", source_id="test-1")]

        # Test that convenience function returns a valid response
        # (will use rule-based fallback if OpenAI not configured)
        response = generate_response("Test question", chunks)

        assert response
        assert isinstance(response, str)
        assert len(response) > 0

    def test_convenience_function_no_chunks(self):
        """Test the convenience function works without chunks."""
        # Test that convenience function returns a valid response
        # (will use rule-based fallback if OpenAI not configured)
        response = generate_response("Test question")

        assert response
        assert isinstance(response, str)
        assert len(response) > 0


class TestContextBuilding:
    """Test context building from chunks."""

    def test_context_truncation(self):
        """Test that context is truncated to MAX_CONTEXT_CHARS."""
        generator = ResponseGenerator(enable_openai=False)

        # Create a chunk that exceeds MAX_CONTEXT_CHARS (default 6000)
        long_content = "A" * 7000
        chunks = [RetrievedChunk(content=long_content)]

        # Should not raise, should handle truncation
        response = generator.generate_response("Test", chunks)
        assert response

    def test_context_from_multiple_chunks(self):
        """Test context building from multiple chunks."""
        generator = ResponseGenerator(enable_openai=False)

        chunks = [
            RetrievedChunk(content="First piece of information."),
            RetrievedChunk(content="Second piece of information."),
            RetrievedChunk(content="Third piece of information."),
        ]

        response = generator.generate_response("Test question", chunks)
        assert response
        # Should incorporate content from chunks
        assert "First" in response or "Second" in response or "Third" in response

