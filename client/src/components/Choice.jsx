import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/Choice.css';
import { getServerData, postServerData } from '../helper/helper';

const Choice = () => {
    const navigate = useNavigate();
    const userId = useSelector(state => state.result.userId);
    const [choices, setChoices] = useState({
        ageGroup: '',
        difficulty: '',
        timePerQuestion: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate all choices are selected
            if (!choices.ageGroup || !choices.difficulty || !choices.timePerQuestion) {
                alert('Please select all options');
                return;
            }

            // First save preferences
            const preferencesResponse = await postServerData('/api/choices', {
                userId,
                ...choices
            }, (data) => {
                console.log('Preferences saved:', data);
                return data;
            });

            if (!preferencesResponse || !preferencesResponse.message) {
                throw new Error('Failed to save preferences');
            }

            // Then generate questions
            const questionsResponse = await postServerData('/api/questions/new', { userId }, (data) => {
                console.log('Questions generated:', data);
                return data;
            });

            // Check if we got a success message
            if (!questionsResponse || !questionsResponse.message) {
                throw new Error('Failed to generate questions');
            }

            // Finally navigate to quiz
            navigate('/quiz');
        } catch (error) {
            console.error('Error in quiz setup:', error);
            alert('Error setting up quiz. Please try again.');
        }
    };

    return (
        <div className="choice-container">
            <h1 className="choice-title">Customize Your Quiz</h1>
            
            <form onSubmit={handleSubmit} className="choice-form">
                <div className="choice-section">
                    <h2>Age Group</h2>
                    <div className="choice-options">
                        {['3-12', '12-18', '18+'].map((age) => (
                            <label key={age} className="choice-option">
                                <input
                                    type="radio"
                                    name="ageGroup"
                                    value={age}
                                    checked={choices.ageGroup === age}
                                    onChange={(e) => setChoices({...choices, ageGroup: e.target.value})}
                                />
                                <span className="choice-label">{age}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="choice-section">
                    <h2>Difficulty Level</h2>
                    <div className="choice-options">
                        {['Easy', 'Medium', 'Hard'].map((level) => (
                            <label key={level} className="choice-option">
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value={level.toLowerCase()}
                                    checked={choices.difficulty === level.toLowerCase()}
                                    onChange={(e) => setChoices({...choices, difficulty: e.target.value})}
                                />
                                <span className="choice-label">{level}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="choice-section">
                    <h2>Time Per Question</h2>
                    <div className="choice-options">
                        {['10s', '30s', '1min'].map((time) => (
                            <label key={time} className="choice-option">
                                <input
                                    type="radio"
                                    name="timePerQuestion"
                                    value={time}
                                    checked={choices.timePerQuestion === time}
                                    onChange={(e) => setChoices({...choices, timePerQuestion: e.target.value})}
                                />
                                <span className="choice-label">{time}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" className="choice-submit">
                    Start Quiz
                </button>
            </form>
        </div>
    );
};

export default Choice; 