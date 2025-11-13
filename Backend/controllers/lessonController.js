const LessonModel = require('../models/lessonModel');
const supabase = require('../database/supabaseClient');

// GET /subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await LessonModel.getAllSubjects();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /lessons?subjectId=1
exports.getLessonsBySubject = async (req, res) => {
  const { subjectId } = req.query;
  try {
    const lessons = await LessonModel.getLessonsBySubject(subjectId);
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /lessons/:id
exports.getLesson = async (req, res) => {
  const { id } = req.params;
  try {
    const lesson = await LessonModel.getLessonById(id);
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /lessons/:id/quiz
exports.getQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await LessonModel.getQuizByLessonId(id);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};