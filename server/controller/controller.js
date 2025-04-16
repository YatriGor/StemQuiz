import Questions from '../models/questionSchema.js';
import Results from '../models/resultSchema.js';

/** Get all questions */
export async function getQuestions(req, res) {
    try {
        const questions = await Questions.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Insert a question */
export async function insertQuestion(req, res) {
    try {
        const { question, options, answer } = req.body;
        const newQuestion = new Questions({ question, options, answer });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Delete all questions */
export async function dropQuestions(req, res) {
    try {
        await Questions.deleteMany();
        res.json({ message: 'All questions deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Get all results */
export async function getResult(req, res) {
    try {
        const results = await Results.find();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Store a result */
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achieved } = req.body;
        const newResult = new Results({ username, result, attempts, points, achieved });
        await newResult.save();
        res.status(201).json(newResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Delete all results */
export async function dropResult(req, res) {
    try {
        await Results.deleteMany();
        res.json({ message: 'All results deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 