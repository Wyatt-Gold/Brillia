// Backend/controllers/flashcardController.js

exports.generateFlashcard = async (req, res) => {
    const { lessonId, gapSummary } = req.body;
    try {
        // TODO: Call ML service to generate content
        // await fetch(ML_API_URL, ...)
        res.json({ flashcardId: 123, lessonId, content: 'Generated flashcard content' });
    } catch (err) {
        console.error("Error generating flashcard:", err);
        res.status(500).json({ error: "Failed to generate flashcard", details: err.message });
    }
  };
  
exports.reviewFlashcard = async (req, res) => {
    const { id } = req.params;
    try {
        // TODO: Update flashcard review stats in DB
        res.json({ flashcardId: id, result: 'reviewed' });
    } catch (err) {
        console.error("Error reviewing flashcard:", err);
        res.status(500).json({ error: "Failed to submit review", details: err.message });
    }
};
