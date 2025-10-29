-- SUBJECTS
CREATE TABLE subjects (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- LESSONS
CREATE TABLE lessons (
  id BIGSERIAL PRIMARY KEY,
  subject_id BIGINT REFERENCES subjects(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  content TEXT,
  difficulty INT,
  prereq_lesson_id BIGINT REFERENCES lessons(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- QUIZZES
CREATE TABLE quizzes (
  id BIGSERIAL PRIMARY KEY,
  lesson_id BIGINT REFERENCES lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  options JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROGRESS
CREATE TABLE progress (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  lesson_id BIGINT REFERENCES lessons(id),
  mastery_level FLOAT DEFAULT 0.0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FLASHCARDS
CREATE TABLE flashcards (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  lesson_id BIGINT REFERENCES lessons(id),
  question TEXT,
  answer TEXT,
  reviewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CHAT
CREATE TABLE chat_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_messages (
  id BIGSERIAL PRIMARY KEY,
  session_id BIGINT REFERENCES chat_sessions(id),
  sender VARCHAR(10) CHECK (sender IN ('user','bot')),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LOGS
CREATE TABLE logs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  lesson_id BIGINT REFERENCES lessons(id),
  user_query TEXT,
  rag_response TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);