exports.getSubjects = (req, res) => {
    // TODO: Fetch subjects from DB
    res.json([{ id: 1, name: 'Math' }, { id: 2, name: 'Science' }]);
  };
  
  exports.getLessonsBySubject = (req, res) => {
    const { subjectId } = req.query;
    // TODO: Fetch lessons for subject
    res.json([{ id: 1, title: 'Algebra', subjectId }, { id: 2, title: 'Geometry', subjectId }]);
  };
  
  exports.getLesson = (req, res) => {
    const { id } = req.params;
    // TODO: Fetch main lesson content
    res.json({ id, title: 'Sample Lesson', content: 'Lesson content here...' });
  };
  
  exports.getQuiz = (req, res) => {
    const { id } = req.params;
    // TODO: Fetch lesson quiz
    res.json({ lessonId: id, quiz: ['Q1', 'Q2', 'Q3'] });
  };