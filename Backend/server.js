import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import lessons from './routes/lessons.js';
import chat from './routes/chat.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Brillia Backend API Running ✅'));
app.use('/api/lessons', lessons);
app.use('/api/chat', chat);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
