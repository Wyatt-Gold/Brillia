const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/subjects', lessonController.getSubjects);
router.get('/', lessonController.getLessonsBySubject); // ?subjectId=...
router.get('/:id', lessonController.getLesson);
router.get('/:id/quiz', lessonController.getQuiz);

module.exports = router;