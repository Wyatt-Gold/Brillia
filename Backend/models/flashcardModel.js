const supabase = require('../database/supabaseClient');

// Fetch all flashcards for a user
async function getFlashcards(userId) {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  return data;
}

// Create placeholder flashcards for a lesson
async function createFlashcard(userId, lessonId, question, answer) {
  const { data, error } = await supabase
    .from('flashcards')
    .insert({
      user_id: userId,
      lesson_id: lessonId,
      question,
      answer,
    })
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// Mark flashcard as reviewed
async function markReviewed(flashcardId) {
  const { data, error } = await supabase
    .from('flashcards')
    .update({ reviewed: true })
    .eq('id', flashcardId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

module.exports = {
  getFlashcards,
  createFlashcard,
  markReviewed,
};