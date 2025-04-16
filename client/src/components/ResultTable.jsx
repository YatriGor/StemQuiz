import React from 'react'
import '../styles/ResultTable.css'

export default function ResultTable() {
    const data = [
        {
            _id: '3',
            username: 'Dev',
            points: 50,
            correct: 5,
            total: 5,
            achieved: 'Passed',
            createdAt: new Date('2025-04-16')
        },
        {
            _id: '2',
            username: 'Kathan',
            points: 40,
            correct: 4,
            total: 5,
            achieved: 'Passed',
            createdAt: new Date('2025-04-16')
        },
        {
            _id: '1',
            username: 'Yatri',
            points: 30,
            correct: 3,
            total: 5,
            achieved: 'Passed',
            createdAt: new Date('2025-04-16')
        }
    ];

    return (
        <div className="result-table-container">
            <h2 className="table-title">All Results</h2>
            <table className="result-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Correct</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((result, index) => (
                        <tr key={result._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                            <td>{index + 1}</td>
                            <td>{result.username}</td>
                            <td>{result.points}</td>
                            <td>{result.correct}</td>
                            <td>{result.total}</td>
                            <td>
                                <span className={`status-badge ${result.achieved.toLowerCase()}`}>
                                    {result.achieved}
                                </span>
                            </td>
                            <td>{result.createdAt.toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
