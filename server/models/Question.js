const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    preferences: {
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
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Question', questionSchema); 