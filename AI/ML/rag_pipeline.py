import pandas as pd
from sentence_transformers import SentenceTransformer
import weaviate

class RAGPipeline:
    def __init__(self, reset=False):
        print("Connecting to Weaviate...")
        self.client = weaviate.Client("http://localhost:8080")

        # Schema definition
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
            print("Reset = True → Clearing schema and recreating database...")
            self.client.schema.delete_all()
            self.client.schema.create(self.schema)
        else:
            print("Reset = False → Connecting without wiping existing data.")

        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.data = None

    def load_data(self, path):
        self.data = pd.read_csv(path)
        print(f"Loaded {len(self.data)} rows from {path}")
        return self.data

    def ingest(self):
        if self.data is None:
            raise ValueError("No data loaded. Call load_data() first.")

        texts = self.data["text"].tolist()
        vectors = self.model.encode(texts, batch_size=32)

        for i, row in self.data.iterrows():
            data_object = {
                "doc_id": str(row["id"]),
                "topic": row["topic"],
                "grade": row["grade"],
                "type": row["type"],
                "text": row["text"],
            }

            self.client.data_object.create(
                data_object,
                "LessonChunk",
                vector=vectors[i]
            )

        print("Ingestion complete!")

    def query(self, question):
        qvec = self.model.encode(question).tolist()

        resp = (
            self.client.query
                .get("LessonChunk", ["doc_id", "text"])
                .with_near_vector({"vector": qvec})
                .with_limit(3)
                .do()
        )

        return resp

    def organized_print(self, resp):
        results = resp["data"]["Get"]["LessonChunk"]
        print("\n=== Top Results ===\n")
    
        for i, item in enumerate(results, start=1):
            print(f"📘 Result {i}:")
            print(f"ID: {item['doc_id']}")
            print("Text:")
            print(item["text"])
            print("\n" + "-"*50 + "\n")