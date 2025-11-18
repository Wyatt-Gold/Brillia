"""Type definitions for retrieved chunks from vector database."""

from dataclasses import dataclass


@dataclass
class RetrievedChunk:
    """Represents a chunk retrieved from a vector database.

    Attributes:
        content: The text content of the retrieved chunk (required).
        score: Optional similarity score from the retrieval.
        source_id: Optional identifier for the source document/lesson.
        metadata: Optional dictionary with additional metadata.
    """

    content: str
    score: float | None = None
    source_id: str | None = None
    metadata: dict[str, object] | None = None

