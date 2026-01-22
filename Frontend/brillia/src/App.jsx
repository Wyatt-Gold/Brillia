import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LessonsPage from "./pages/LessonsPage";
import SubLessonsPage from "./pages/SubLessonsPage";
import FlashcardPage from "./pages/FlashcardPage";
import StatusPage from "./pages/StatusPage";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:subjectId" element={<LessonsPage />} />
        <Route path="/lessons/:subjectId/topics" element={<SubLessonsPage />} />
        <Route path="/flashcards" element={<FlashcardPage />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
