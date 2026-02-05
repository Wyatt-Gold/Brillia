# Brillia Frontend - Development Context

## Last Updated: 2026-02-05

## Project Structure
- **Frontend Location:** `Brillia/Frontend/brillia/`
- **Backend Location:** `Brillia/Backend/`
- **Tasks File:** `Brillia/Frontend/brillia/Tasks.txt`

---

## Sprint 4 Status: COMPLETE

### Pre-Sprint: File Renaming (Terminology Alignment)
Renamed files to match backend terminology:

| Old File | New File | Purpose |
|----------|----------|---------|
| `LessonsPage.jsx` | `SubjectsPage.jsx` | Shows subject cards (Math, Science, etc.) |
| `SubLessonsPage.jsx` | `LessonsPage.jsx` | Shows lessons within a subject |

### 1. API Service Layer
- **File:** `src/services/api.js`
- **Features Implemented:**
  - `fetchSubjects()` - GET /api/lessons/subjects
  - `fetchLessonsBySubject(subjectId)` - GET /api/lessons?subjectId=X
  - `fetchLessonById(lessonId)` - GET /api/lessons/:id
  - `fetchLessonQuiz(lessonId)` - GET /api/lessons/:id/quiz
  - `startChatSession()` - POST /api/chat/start
  - `sendChatMessage(sessionId, message)` - POST /api/chat/:sessionId
  - `getChatHistory(sessionId)` - GET /api/chat/:sessionId/history
  - Configurable API base URL via `VITE_API_URL` env var (default: `http://localhost:3000/api`)

### 2. Dynamic Subjects Page
- **File:** `src/pages/SubjectsPage.jsx`
- **Route:** `/subjects`
- **Features Implemented:**
  - Fetches subjects from backend API on mount
  - Loading spinner while fetching
  - Error handling with warning banner
  - Fallback to hardcoded data when API unavailable
  - Links to `/subjects/:subjectId/lessons`

### 3. Dynamic Lessons Page
- **File:** `src/pages/LessonsPage.jsx`
- **Route:** `/subjects/:subjectId/lessons`
- **Features Implemented:**
  - Fetches lessons by subject from backend API
  - Dynamic progress calculation based on completed lessons
  - Loading spinner while fetching
  - Error handling with warning banner
  - Fallback to hardcoded data when API unavailable
  - Links to `/lessons/:lessonId` for lesson detail

### 4. Lesson Detail Page
- **File:** `src/pages/LessonDetailPage.jsx`
- **Route:** `/lessons/:lessonId`
- **Features Implemented:**
  - Fetches full lesson content from backend API
  - Displays: title, description, difficulty badge, full content
  - Basic markdown-style content rendering (headings, lists)
  - Quiz button (placeholder)
  - Back navigation to subjects/lessons
  - Error handling with fallback content

### 5. Chatbot Backend Integration
- **File:** `src/components/Chatbot.jsx`
- **Features Implemented:**
  - Initializes chat session on open via `POST /api/chat/start`
  - Sends messages via `POST /api/chat/:sessionId`
  - Loads chat history via `GET /api/chat/:sessionId/history`
  - Loading indicator (typing dots) while waiting for response
  - Connection error detection with "Offline mode" indicator
  - Fallback responses when backend unavailable

### 6. Navigation Updates
- **Files Updated:** `Header.jsx`, `HomePage.jsx`, `SubjectsPage.jsx`, `LessonsPage.jsx`
- **Changes:**
  - All navigation links use React Router `<Link>` component
  - Updated routes from `/lessons` to `/subjects`
  - HomePage subject cards link to `/subjects/:id/lessons`

---

## Sprint 3 Status: COMPLETE

### 1. User Status Dashboard
- **File:** `src/pages/StatusPage.jsx` + `StatusPage.css`
- **Route:** `/status`
- **Features Implemented:**
  - Progress bars with percentage labels
  - Multi-subject tracking (Math, Science, History, English)
  - Animated fill transitions (0.5s)
  - Hardcoded sample data (45%, 60%, 80%, 100%)

### 2. Flashcard Page
- **File:** `src/pages/FlashcardPage.jsx` + `FlashcardPage.css`
- **Route:** `/flashcards`
- **Features Implemented:**
  - 3D card-flip animation (CSS transforms, 600ms)
  - Previous/Next navigation
  - 5 dummy cards with Q&A
  - Auto-unflip on navigation

### 3. Lesson Flow Page (now LessonsPage)
- **File:** `src/pages/LessonsPage.jsx`
- **Route:** `/subjects/:subjectId/lessons`
- **Features Implemented:**
  - Pre-requisites section
  - Next Steps section
  - Quiz placeholder with "Start Quiz" button
  - Lesson status indicators (completed, in-progress, locked)
  - Unit progress bar (dynamic based on API data)
  - Breadcrumb navigation

---

## Current Routes (App.jsx)

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page with hero and subject cards |
| `/subjects` | SubjectsPage | Grid of all subjects |
| `/subjects/:subjectId/lessons` | LessonsPage | Lessons within a subject |
| `/lessons/:lessonId` | LessonDetailPage | Full lesson content view |
| `/flashcards` | FlashcardPage | Flashcard study mode |
| `/status` | StatusPage | User progress dashboard |

**Note:** Chatbot is rendered on all pages as a floating component.

---

## Key Files Reference

### Frontend Pages
| Page | File | Route |
|------|------|-------|
| Home | `src/pages/HomePage.jsx` | `/` |
| Subjects | `src/pages/SubjectsPage.jsx` | `/subjects` |
| Lessons | `src/pages/LessonsPage.jsx` | `/subjects/:subjectId/lessons` |
| Lesson Detail | `src/pages/LessonDetailPage.jsx` | `/lessons/:lessonId` |
| Flashcards | `src/pages/FlashcardPage.jsx` | `/flashcards` |
| Status | `src/pages/StatusPage.jsx` | `/status` |

### Services
| Service | File | Purpose |
|---------|------|---------|
| API | `src/services/api.js` | All backend API calls |

### Components
| Component | File | Purpose |
|-----------|------|---------|
| Chatbot | `src/components/Chatbot.jsx` | Floating AI chat assistant |
| Header | `src/Header.jsx` | Reusable header (used by some pages) |
| Footer | `src/Footer.jsx` | Reusable footer |

### Terminology Alignment
| Frontend | Backend | Example |
|----------|---------|---------|
| Subjects | `subjects` table | Mathematics, Science |
| Lessons | `lessons` table | Addition, Subtraction |
| Quizzes | `quizzes` table | Quiz questions per lesson |

---

## Backend Endpoints (Expected)

### Subjects & Lessons
- `GET /api/lessons/subjects` - All subjects
- `GET /api/lessons?subjectId=X` - Lessons by subject
- `GET /api/lessons/:id` - Single lesson with full content
- `GET /api/lessons/:id/quiz` - Quiz for lesson

### Chat
- `POST /api/chat/start` - Create new chat session (returns `sessionId`)
- `POST /api/chat/:sessionId` - Send message (body: `{ message }`, returns `{ message }` or `{ response }`)
- `GET /api/chat/:sessionId/history` - Get chat history (returns `{ messages }`)

### Progress (not yet integrated)
- `GET /api/progress/:userId` - User progress
- `POST /api/progress/update` - Update progress

### Flashcards (not yet integrated)
- `GET /api/flashcards/:userId` - User flashcards
- `POST /api/flashcards/generate` - Generate flashcards

---

## Running the Application

### Frontend Only (with fallback data)
```bash
cd Brillia/Frontend/brillia
npm install
npm run dev
```
- Frontend runs on `http://localhost:5173`
- Pages will show fallback/hardcoded data with warning banners

### With Backend
```bash
# Terminal 1: Start backend
cd Brillia/Backend
npm install
npm run dev  # or node server.js

# Terminal 2: Start frontend
cd Brillia/Frontend/brillia
npm run dev
```
- Backend should run on `http://localhost:3000`
- Frontend will fetch real data from API

### Environment Variables (Optional)
Create `.env` in `Brillia/Frontend/brillia/`:
```
VITE_API_URL=http://localhost:3000/api
```

---

## Notes
- Backend uses Supabase for database
- Progress tracking uses mastery level (0-1 scale)
- Quiz functionality is placeholder only (no actual quiz implementation yet)
- All pages gracefully handle API failures with fallback data
- CORS must be enabled on backend for frontend origin
