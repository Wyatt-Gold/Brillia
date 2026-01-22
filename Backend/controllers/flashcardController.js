const FlashcardModel = require('../models/flashcardModel');

// GET /api/flashcards/:userId
exports.getUserFlashcards = async (req, res) => {
  const { userId } = req.params;
  try {
    const flashcards = await FlashcardModel.getFlashcards(userId);
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/flashcards/generate
exports.generateFlashcards = async (req, res) => {
  const { userId, lessonId } = req.body;

  // Placeholder flashcards instead of ML generation
  const placeholder = [
    { question: "What is the definition of X?", answer: "X means..." },
    { question: "How do you solve Y?", answer: "To solve Y, you..." },
  ];

  try {
    const created = [];
    for (let card of placeholder) {
      const row = await FlashcardModel.createFlashcard(
        userId,
        lessonId,
        card.question,
        card.answer
      );
      created.push(row);
    }

    res.json({ generated: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/flashcards/review
exports.reviewFlashcard = async (req, res) => {
  const { flashcardId } = req.body;

  try {
    const updated = await FlashcardModel.markReviewed(flashcardId);
    res.json({ reviewed: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};