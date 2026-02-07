import os
from dotenv import load_dotenv
load_dotenv()

import pandas as pd
from sentence_transformers import SentenceTransformer
import weaviate
from openai import OpenAI

client = OpenAI()
os.environ["TOKENIZERS_PARALLELISM"] = "false"

class RAGPipeline:
    def __init__(self, reset=False):
        print("Connecting to Weaviate...")
        self.client = weaviate.Client("http://localhost:8080")

        self.schema = {
            "classes": [
                {
                    "class": "LessonChunk",
                    "vectorizer": "none",
                    "properties": [
                        {"name": "doc_id", "dataType": ["text"]},
                        {"name": "topic", "dataType": ["text"]},
                        {"name": "grade", "dataType": ["text"]},
                        {"name": "type", "dataType": ["text"]},
                        {"name": "text", "dataType": ["text"]}
                    ]
                }
            ]
        }

        if reset:
            self.client.schema.delete_all()
            self.client.schema.create(self.schema)

        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.data = None

    def load_data(self, path):
        self.data = pd.read_csv(path)
        return self.data

    def ingest(self):
        texts = self.data["text"].tolist()
        vectors = self.model.encode(texts, batch_size=32)

        for i, row in self.data.iterrows():
            self.client.data_object.create(
                {
                    "doc_id": str(row["id"]),
                    "topic": row["topic"],
                    "grade": row["grade"],
                    "type": row["type"],
                    "text": row["text"],
                },
                "LessonChunk",
                vector=vectors[i]
            )

    def query(self, question):
        qvec = self.model.encode(question).tolist()

        return (
            self.client.query
                .get("LessonChunk", ["doc_id", "text"])
                .with_near_vector({"vector": qvec})
                .with_limit(3)
                .do()
        )

    def _extract_text(self, resp):
        chunks = resp["data"]["Get"]["LessonChunk"]
        return "\n\n".join(c["text"] for c in chunks)

    def answer_question(self, context):
        retrieved = self.query(context["question"])
        supporting_text = self._extract_text(retrieved)

        prompt = f"""
You are a tutor for a grade {context['grade']} student.
Instruction type: {context['request_type']}.
Do not overexplain.
Do not give the final answer unless explicitly asked.

Context:
{supporting_text}

Question:
{context['question']}
"""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful math tutor."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        return response.choices[0].message.content
