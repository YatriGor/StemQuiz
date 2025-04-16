import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

export default function QuizDetails() {
    const [quizDetails, setQuizDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { quizId } = useParams();
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const token = await getToken();
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_HOSTNAME}/api/quiz-details/${quizId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                const data = await response.json();
                setQuizDetails(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz details:', error);
                setLoading(false);
            }
        };

        fetchQuizDetails();
    }, [quizId, getToken]);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (!quizDetails) {
        return <div className="text-center mt-8">Quiz not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-light">Quiz Details</h1>
            
            <div className="bg-dark p-6 rounded-lg shadow-lg mb-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-light">Date Taken:</p>
                        <p className="text-primary">
                            {new Date(quizDetails.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-light">Score:</p>
                        <p className="text-primary">{quizDetails.points} points</p>
                    </div>
                    <div>
                        <p className="text-light">Attempts:</p>
                        <p className="text-primary">{quizDetails.attempts}</p>
                    </div>
                    <div>
                        <p className="text-light">Result:</p>
                        <p className={quizDetails.achieved === "Passed" ? "text-primary" : "text-red-500"}>
                            {quizDetails.achieved}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {quizDetails.questions.map((question, index) => {
                    const userAnswer = quizDetails.answers[index];
                    const correctAnswer = quizDetails.result[index];
                    const isCorrect = userAnswer === correctAnswer;

                    return (
                        <div key={index} className="bg-dark p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-light mb-4">
                                Question {index + 1}: {question.question}
                            </h3>
                            
                            <div className="mb-4">
                                <p className="text-light mb-2">Your Answer:</p>
                                <div className={`p-3 rounded ${
                                    isCorrect 
                                        ? "bg-green-500 text-white" 
                                        : "bg-red-500 text-white"
                                }`}>
                                    {question.options[userAnswer]}
                                </div>
                            </div>

                            {!isCorrect && (
                                <div className="mb-4">
                                    <p className="text-light mb-2">Correct Answer:</p>
                                    <div className="p-3 rounded bg-green-500 text-white">
                                        {question.options[correctAnswer]}
                                    </div>
                                </div>
                            )}

                            <div className="mt-4">
                                <p className="text-light mb-2">All Options:</p>
                                <div className="space-y-2">
                                    {question.options.map((option, optionIndex) => (
                                        <div
                                            key={optionIndex}
                                            className={`p-3 rounded ${
                                                optionIndex === userAnswer
                                                    ? isCorrect 
                                                        ? "bg-green-500 text-white" 
                                                        : "bg-red-500 text-white"
                                                    : optionIndex === correctAnswer
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-700 text-light"
                                            }`}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 