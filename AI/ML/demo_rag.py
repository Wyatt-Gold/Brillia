from rag_pipeline import RAGPipeline

rag = RAGPipeline()

tests = [
    "How do I solve 2x + 3 = 11?",
    "What is the first step to isolate x?",
    "Give me a hint for a linear equation"
]

for q in tests:
    print("\nQ:", q)
    print("A:", rag.answer_question({
        "grade": "8",
        "request_type": "hint",
        "question": q
    }))
