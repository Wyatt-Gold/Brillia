from fastapi import FastAPI
from pydantic import BaseModel
from rag_pipeline import RAGPipeline

app = FastAPI()
rag = RAGPipeline()

class TutorRequest(BaseModel):
    grade: str
    request_type: str
    question: str

class TutorResponse(BaseModel):
    answer: str

@app.post("/ai/tutor", response_model=TutorResponse)
def tutor(req: TutorRequest):
    answer = rag.answer_question(req.dict())
    return {"answer": answer}
