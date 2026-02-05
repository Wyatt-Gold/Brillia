const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Subjects API
export async function fetchSubjects() {
  const response = await fetch(`${API_BASE_URL}/lessons/subjects`);
  return handleResponse(response);
}

// Lessons API
export async function fetchLessonsBySubject(subjectId) {
  const response = await fetch(`${API_BASE_URL}/lessons?subjectId=${subjectId}`);
  return handleResponse(response);
}

export async function fetchLessonById(lessonId) {
  const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`);
  return handleResponse(response);
}

export async function fetchLessonQuiz(lessonId) {
  const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}/quiz`);
  return handleResponse(response);
}

// Chat API
export async function startChatSession() {
  const response = await fetch(`${API_BASE_URL}/chat/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
}

export async function sendChatMessage(sessionId, message) {
  const response = await fetch(`${API_BASE_URL}/chat/${sessionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  return handleResponse(response);
}

export async function getChatHistory(sessionId) {
  const response = await fetch(`${API_BASE_URL}/chat/${sessionId}/history`);
  return handleResponse(response);
}

export default {
  fetchSubjects,
  fetchLessonsBySubject,
  fetchLessonById,
  fetchLessonQuiz,
  startChatSession,
  sendChatMessage,
  getChatHistory,
};
