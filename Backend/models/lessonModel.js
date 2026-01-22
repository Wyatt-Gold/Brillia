// Backend/models/lessonModel.js
const supabase = require('../database/supabaseClient');

// Subjects
async function getAllSubjects() {
  const { data, error } = await supabase
    .from('subjects')
    .select('*');

  if (error) throw error;
  return data;
}

// Lessons by Subject
async function getLessonsBySubject(subjectId) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject_id', subjectId);

  if (error) throw error;
  return data;
}

// One Lesson
async function getLessonById(id) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Quiz for a Lesson
async function getQuizByLessonId(lessonId) {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lessonId);

  if (error) throw error;
  return data;
}

// Export all functions
module.exports = {
  getAllSubjects,
  getLessonsBySubject,
  getLessonById,
  getQuizByLessonId,
};