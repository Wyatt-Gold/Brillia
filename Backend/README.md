Backend API

Built with Node.js and Express.js, it provides endpoints for authentication, lessons, progress tracking, flashcards, chat, and admin functionality.

Folder Structure
backend/
├── server.js           # Entry point
├── routes/             # Route definitions
├── controllers/        # Route logic
└── models/             # Database queries / schemas

Running the Server
1. npm install
2. node server.js

Auth/profile
POST /auth/signup /
POST /auth/login /
POST /auth/logout
GET /me(user)/grade/level
Class/Lesson/Quiz
GET /subjects
GET /lessons?subjectId=...  subject overview
GET /lessons/{id}  main lesson
GET /lessons/{id}/quiz call quiz
Progress/Mypage
GET /progress show progress bar for each lesson
GET /roadmap individualize user lesson flow
Flashcard
POST /flashcards/generate : {lessonId|gapSummary} generate and save  card using ML
POST /flashcards/{id}/review daily review card
Chatbot
POST /chat/start
POST /chat/{sessionId}/message : {text}
GET /chat/{sessionId}/history
Admin/Data
POST /admin/ingest


GET /admin/metrics 
