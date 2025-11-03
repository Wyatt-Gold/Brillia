exports.showProgress = (req, res) => {
    // TODO: Fetch user progress
    res.json([
      { lessonId: 1, progress: 50 },
      { lessonId: 2, progress: 80 }
    ]);
  };
  
  exports.getRoadmap = (req, res) => {
    // TODO: Generate individualized roadmap
    res.json([
      { lessonId: 1, status: 'complete' },
      { lessonId: 2, status: 'pending' },
      { lessonId: 3, status: 'locked' }
    ]);
  };