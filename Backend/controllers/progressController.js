// Backend/controllers/progressController.js

exports.showProgress = async (req, res) => {
    try {
        // TODO: Fetch user progress from DB
        res.json([
            { lessonId: 1, progress: 50 },
            { lessonId: 2, progress: 80 }
        ]);
    } catch (err) {
        console.error("Error fetching progress:", err);
        res.status(500).json({ error: "Failed to fetch progress", details: err.message });
    }
};
  
exports.getRoadmap = async (req, res) => {
    try {
        // TODO: Generate individualized roadmap logic
        res.json([
            { lessonId: 1, status: 'complete' },
            { lessonId: 2, status: 'pending' },
            { lessonId: 3, status: 'locked' }
        ]);
    } catch (err) {
        console.error("Error fetching roadmap:", err);
        res.status(500).json({ error: "Failed to fetch roadmap", details: err.message });
    }
};
