const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcardController');

router.post('/generate', flashcardController.generateFlashcard);
router.post('/:id/review', flashcardController.reviewFlashcard);

module.exports = router;