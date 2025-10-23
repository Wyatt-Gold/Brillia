from rag_pipeline import RAGPipeline

if __name__ == "__main__":
    print("Starting Brillia ML system...")
    rag = RAGPipeline()
    rag.load_data("data/sample_lessons.csv")
    print("RAG system initialized ✅")
