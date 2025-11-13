// Backend/controllers/lessonController.js
const LessonModel = require('../models/lessonModel');
// const supabase = require('../database/supabaseClient'); 

// Helper for consistent error handling
const handleError = (res, err, action) => {
  console.error(`Error while ${action}:`, err);
  res.status(500).json({ error: `Failed to ${action}`, details: err.message });
};

// GET /subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await LessonModel.getAllSubjects();
    res.json(subjects);
  } catch (err) {
    handleError(res, err, 'fetch subjects');
  }
};

// GET /lessons?subjectId=1
exports.getLessonsBySubject = async (req, res) => {
  const { subjectId } = req.query;
  try {
    if (!subjectId) {
      return res.status(400).json({ error: "subjectId query parameter is required" });
    }
    const lessons = await LessonModel.getLessonsBySubject(subjectId);
    res.json(lessons);
  } catch (err) {
    handleError(res, err, 'fetch lessons by subject');
  }
};

// GET /lessons/:id
exports.getLesson = async (req, res) => {
  const { id } = req.params;
  try {
    const lesson = await LessonModel.getLessonById(id);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.json(lesson);
  } catch (err) {
    handleError(res, err, 'fetch lesson');
  }
};

// GET /lessons/:id/quiz
exports.getQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await LessonModel.getQuizByLessonId(id);
    res.json(quiz);
  } catch (err) {
    handleError(res, err, 'fetch quiz');
  }
};
