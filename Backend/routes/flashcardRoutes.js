const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcardController');

router.get('/:userId', flashcardController.getUserFlashcards);
router.post('/generate', flashcardController.generateFlashcards);
router.post('/review', flashcardController.reviewFlashcard);

module.exports = router;