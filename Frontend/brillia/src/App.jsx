import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SubjectsPage from "./pages/SubjectsPage";
import LessonsPage from "./pages/LessonsPage";
import LessonDetailPage from "./pages/LessonDetailPage";
import FlashcardPage from "./pages/FlashcardPage";
import StatusPage from "./pages/StatusPage";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/subjects/:subjectId/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:lessonId" element={<LessonDetailPage />} />
        <Route path="/flashcards" element={<FlashcardPage />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
