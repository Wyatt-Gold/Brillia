**ML Service Setup & Backend Usage
**Setup
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --host 0.0.0.0 --port 8001

The service runs at:
http://localhost:8001

Endpoint
POST /generate

Request Body

{ "query": "text to process" }

Response

{ "answer": "model output" }

**How the Backend Calls This Service
**
Backend makes a POST request to /generate:

import axios from "axios";

export async function callMLService(query) {
  const res = await axios.post(
    `${process.env.ML_SERVICE_URL}/generate`,
    { query }
  );
  return res.data;
}


**Backend .env must include:
**
ML_SERVICE_URL=http://localhost:8001
