from rag_pipeline import RAGPipeline

if __name__ == "__main__":
    print("Starting Brillia ML system...")
    rag = RAGPipeline()
    
    # Load GSM8K
    rag.load_data("data/gsm8k/gsm8k_clean.csv")
    rag.ingest()

    # Load Algebra
    rag.load_data("data/algebra/algebra_clean.csv")
    rag.ingest()
    
    print("RAG system initialized ✅")
