# StemQuiz - Interactive STEM Education Platform

![StemQuiz Logo](client/src/assets/images/landing/logo.png)

## Overview

StemQuiz is a modern, interactive STEM education platform that combines cutting-edge technology with proven educational methodologies to create an immersive learning experience. The platform features AI-generated quizzes, real-time performance tracking, and a beautiful, responsive UI designed to engage students of all ages.

## Features

- **AI-Powered Quiz Generation**: Utilizes Google's Gemini AI to create personalized STEM quizzes based on user preferences
- **Interactive Quiz Experience**: Dynamic question navigation with immediate feedback
- **Performance Dashboard**: Track quiz results, scores, and time taken
- **User Authentication**: Secure login and registration using Clerk
- **Responsive Design**: Beautiful UI that works on all devices
- **STEM Education Focus**: Specialized content covering Science, Technology, Engineering, and Mathematics

## Tech Stack

### Frontend
- **React**: UI library for building the user interface
- **Redux**: State management for quiz data and user preferences
- **React Router**: Navigation between different pages
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for UI elements
- **Clerk**: Authentication and user management

### Backend
- **Node.js**: JavaScript runtime for the server
- **Express**: Web framework for building the API
- **MongoDB**: NoSQL database for storing quiz data and user preferences
- **Mongoose**: ODM for MongoDB
- **Google Generative AI**: AI service for generating quiz questions
- **Clerk SDK**: Backend authentication integration

## Project Structure

```
stemquiz/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── assets/        # Static assets (images, etc.)
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── redux/         # Redux store and slices
│   │   ├── styles/        # CSS styles
│   │   └── ...
│   └── ...
└── server/                 # Backend Node.js application
    ├── controller/         # Request handlers
    ├── database/           # Database connection
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    ├── router/             # Route definitions
    └── ...
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Google Generative AI API key
- Clerk API keys

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/stemquiz.git
cd stemquiz
```

2. Install dependencies for both client and server
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables
```bash
# In client/.env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# In server/.env
PORT=8080
MONGODB_URI=your_mongodb_uri
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Start the development servers
```bash
# Start the backend server
cd server
npm start

# Start the frontend development server
cd client
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Key Components

### Landing Page
The landing page introduces users to the StemQuiz platform with sections explaining what STEM is, the platform's mission, and team information.

### Quiz Generation
Quizzes are dynamically generated using Google's Gemini AI based on user preferences for difficulty, age group, and time per question.

### Dashboard
The dashboard displays quiz results, scores, and time taken for each user, providing a comprehensive view of performance.

### Quiz Interface
The quiz interface allows users to navigate through questions, select answers, and receive immediate feedback.

## Team

- **Kathan Vyas** (22BCP162)
- **Yatri Gor** (22BCP176)
- **Dev Patel** (22BCP185)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Generative AI for providing the AI capabilities
- Clerk for authentication services
- The React and Node.js communities for their excellent documentation and tools
