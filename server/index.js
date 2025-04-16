import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import quizPreferencesRouter from './routes/quizPreferences.js';
import { generateQuizQuestions } from './geminiService.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quiz-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use(quizPreferencesRouter);

// Generate questions based on preferences
app.post('/api/questions/new', async (req, res) => {
    try {
        const { userId } = req.body;
        const questions = await generateQuizQuestions(userId);
        res.json(questions);
    } catch (error) {
        console.error('Error generating questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 