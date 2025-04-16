import { GoogleGenerativeAI } from '@google/generative-ai';
import QuizPreferences from './models/QuizPreferences.js';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyCoPg5q00Lf-dvTmUYEZmDIDg2odlEtoMM");

export async function generateQuizQuestions(userId) {
    try {
        // Get user's latest preferences
        const preferences = await QuizPreferences.findOne({ userId })
            .sort({ createdAt: -1 });

        if (!preferences) {
            throw new Error('No preferences found for user');
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        const prompt = `Generate 5 multiple choice quiz questions about STEM topics with the following constraints:
        
        1. Question Types:
           - 1 Physics question (must be about mechanics, electricity, or thermodynamics)
           - 1 Chemistry question (must be about elements, compounds, or reactions)
           - 1 Biology question (must be about cells, genetics, or ecosystems)
           - 1 Technology question (must be about programming, AI, or cybersecurity)
           - 1 Mathematics question (must be about algebra, geometry, or calculus)
        
        2. Difficulty and Age Level:
           - Age Group: ${preferences.ageGroup}
           - Difficulty Level: ${preferences.difficulty}
           - Time per Question: ${preferences.timePerQuestion}
        
        3. Variety Rules:
           - No two questions should be about the same specific topic
           - Questions should match the specified difficulty level
           - Include at least one question about recent developments in the field
           - Mix theoretical and practical applications
           - Ensure options are plausible but distinct
        
        4. Format Requirements:
           - Each question must have exactly 3 options
           - Options should be in random order (correct answer not always first)
           - Questions should be clear and concise
           - Avoid using the same words in multiple questions
           - Questions should be appropriate for the specified time limit
        
        Format the response as a JSON object with this structure:
        {
            "questions": [
                {
                    "id": 1,
                    "question": "question text",
                    "options": ["option1", "option2", "option3"],
                    "correctAnswer": 0
                }
            ]
        }`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean the response text to ensure it's valid JSON
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonStr = text.substring(jsonStart, jsonEnd);
        
        // Parse the JSON response
        const parsedResponse = JSON.parse(jsonStr);
        
        // Format the data to match your existing structure
        const formattedQuestions = parsedResponse.questions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            preferences: {
                ageGroup: preferences.ageGroup,
                difficulty: preferences.difficulty,
                timePerQuestion: preferences.timePerQuestion
            }
        }));
        
        const answers = parsedResponse.questions.map(q => q.correctAnswer);
        
        return { questions: formattedQuestions, answers };
    } catch (error) {
        console.error('Error generating questions:', error);
        throw error; // Let the calling function handle the error
    }
} 