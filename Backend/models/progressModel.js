const supabase = require('../database/supabaseClient');

// GET: Get progress by user id
async function getProgressByUserId(userId) {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  return data;
}

// UPDATE: Insert or update progress
async function updateProgress(userId, lessonId, masteryLevel) {
  const { data, error } = await supabase
    .from('progress')
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      mastery_level: masteryLevel,
      updated_at: new Date(),
    });

  if (error) throw new Error(error.message);
  return data;
}

// Export all functions
module.exports = {
  getProgressByUserId,
  updateProgress,
};