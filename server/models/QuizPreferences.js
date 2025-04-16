import mongoose from 'mongoose';

const quizPreferencesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    ageGroup: {
        type: String,
        enum: ['3-12', '12-18', '18+'],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    timePerQuestion: {
        type: String,
        enum: ['10s', '30s', '1min'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('QuizPreferences', quizPreferencesSchema); 