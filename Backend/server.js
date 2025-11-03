const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Import routes
const lessonRoutes = require('./routes/lessonRoutes');
const progressRoutes = require('./routes/progressRoutes');
const flashcardRoutes = require('./routes/flashcardRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use routes
app.use('/lessons', lessonRoutes);
app.use('/progress', progressRoutes);
app.use('/flashcards', flashcardRoutes);
app.use('/chat', chatRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});