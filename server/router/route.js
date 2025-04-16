import express from 'express';
import { getQuestions, insertQuestion, dropQuestions, getResult, storeResult, dropResult } from '../controller/controller.js';
import Questions from '../models/questionSchema.js';
import { generateQuizQuestions } from '../geminiService.js';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import QuizPreferences from '../models/QuizPreferences.js';

const router = express.Router();

/** Save user preferences - No auth required */
router.post('/choices', async (req, res) => {
    try {
        const { userId, ageGroup, difficulty, timePerQuestion } = req.body;
        
        if (!userId || !ageGroup || !difficulty || !timePerQuestion) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create new preferences
        const preferences = new QuizPreferences({
            userId,
            ageGroup,
            difficulty,
            timePerQuestion
        });

        // Save preferences
        await preferences.save();
        console.log("Preferences saved successfully");

        res.status(201).json({ message: 'Preferences saved successfully', preferences });
    } catch (error) {
        console.error('Error saving preferences:', error);
        res.status(500).json({ error: error.message });
    }
});

/** Questions Routes - Protected */
router.get('/questions', ClerkExpressWithAuth(), getQuestions);
router.post('/questions', ClerkExpressWithAuth(), insertQuestion);
router.delete('/questions', ClerkExpressWithAuth(), dropQuestions);

/** Results Routes - Protected */
router.get('/result', ClerkExpressWithAuth(), getResult);
router.post('/result', ClerkExpressWithAuth(), storeResult);
router.delete('/result', ClerkExpressWithAuth(), dropResult);

/** New route for generating questions - Protected */
router.post('/questions/new', ClerkExpressWithAuth(), async (req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Delete existing questions
        await Questions.deleteMany();
        console.log("Previous questions deleted");

        // Generate new questions based on user preferences
        const { questions, answers } = await generateQuizQuestions(userId);
        
        // Insert new questions
        await Questions.insertMany({ questions, answers });
        console.log("New questions generated and inserted successfully");

        res.status(201).json({ message: 'Questions generated successfully' });
    } catch (error) {
        console.error('Error generating questions:', error);
        res.status(500).json({ error: error.message });
    }
});

router.route('/questions/new')
    .get(ClerkExpressWithAuth(), getQuestions);

router.route('/results')
    .get(ClerkExpressWithAuth(), getResult)
    .post(ClerkExpressWithAuth(), storeResult);

router.route('/results/:userId')
    .get(ClerkExpressWithAuth(), getResult);

router.route('/quiz-details/:quizId')
    .get(ClerkExpressWithAuth(), getQuestions);

export default router;