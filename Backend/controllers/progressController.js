const ProgressModel = require('../models/progressModel');

// GET /api/progress/:userId
exports.getUserProgress = async (req, res) => {
  const { userId } = req.params;

  try {
    const progress = await ProgressModel.getProgressByUserId(userId);
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/progress/update
exports.updateUserProgress = async (req, res) => {
  const { userId, lessonId, masteryLevel } = req.body;

  try {
    const saved = await ProgressModel.updateProgress(userId, lessonId, masteryLevel);
    res.json({ success: true, updated: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/progress/:userId/roadmap
exports.getRoadmap = async (req, res) => {
  const { userId } = req.params;

  try {
    const progress = await ProgressModel.getProgressByUserId(userId);

    // Placeholder roadmap logic
    // For example: recommend lessons where mastery < 0.5
    const recommended = progress.filter(p => p.mastery_level < 0.5);

    res.json({
      userId,
      roadmap: recommended.length > 0
        ? recommended.map(r => ({
            lessonId: r.lesson_id,
            reason: "Low mastery level",
          }))
        : [{ message: "All lessons mastered!" }]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};