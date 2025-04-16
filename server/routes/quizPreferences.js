import express from 'express';
import QuizPreferences from '../models/QuizPreferences.js';

const router = express.Router();

// Save quiz preferences
router.post('/api/choices', async (req, res) => {
    try {
        const { userId, ageGroup, difficulty, timePerQuestion } = req.body;

        // Validate required fields
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

        await preferences.save();

        res.status(201).json({
            message: 'Preferences saved successfully',
            preferences
        });
    } catch (error) {
        console.error('Error saving preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user's latest preferences
router.get('/api/choices/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const preferences = await QuizPreferences.findOne({ userId })
            .sort({ createdAt: -1 });

        if (!preferences) {
            return res.status(404).json({ error: 'No preferences found' });
        }

        res.json(preferences);
    } catch (error) {
        console.error('Error fetching preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router; 