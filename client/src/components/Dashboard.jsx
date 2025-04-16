import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Trophy, Clock } from 'lucide-react';
import '../styles/Dashboard.css';

export default function Dashboard() {
    const [quizData, setQuizData] = useState([
        {
            username: "Yatri",
            score: 30,
            totalTime: "0:45",
            correctAnswers: 3,
            totalQuestions: 5
        },
        {
            username: "Kathan",
            score: 40,
            totalTime: "2:45",
            correctAnswers: 4,
            totalQuestions: 5
        },
        {
            username: "Dev",
            score: 50,
            totalTime: "8:20",
            correctAnswers: 5,
            totalQuestions: 5
        }
    ]);


    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Quiz Leaderboard</h1>
                <p className="dashboard-subtitle">Top performers of the week</p>
            </div>

            <div className="quiz-grid">
                {quizData.map((quiz, index) => (
                    <div key={index} className="quiz-card">
                        <div className="quiz-card-header">
                            <div className="user-info">
                                <User className="user-icon" />
                                <h2 className="quiz-name">{quiz.username}</h2>
                            </div>
                            <div className="score-badge">
                                <Trophy className="trophy-icon" />
                                <span className="score-value">{quiz.score}%</span>
                            </div>
                        </div>
                        
                        <div className="quiz-stats">
                            <div className="stat-item">
                                <div className="stat-value">{quiz.correctAnswers}/{quiz.totalQuestions}</div>
                                <div className="stat-label">Correct Answers</div>
                            </div>
                            <div className="stat-item">
                                <div className="time-container">
                                    <Clock className="clock-icon" />
                                    <div className="stat-value">{quiz.totalTime}</div>
                                </div>
                                <div className="stat-label">Time Taken</div>
                            </div>
                        </div>

                        <Link
                            to={`/quiz-details/${index}`}
                            className="view-details-btn"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>

            <div className="dashboard-footer">
                <Link
                    to="/main"
                    className="take-quiz-btn"
                >
                    Take New Quiz
                </Link>
            </div>
        </div>
    );
} 