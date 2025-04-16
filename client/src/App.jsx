import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Dashboard from './components/Dashboard';
import QuizDetails from './components/QuizDetails';
import Choice from './components/Choice';
import TestPage from './components/TestPage';
import LandingPage from './components/LandingPage';

// Import CSS files
import './styles/App.css';
import './styles/Main.css';
import './styles/Result.css';
import './styles/Navbar.css';
import './styles/Choice.css';

// Get the Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="container">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/main" element={<Main />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/main/choice" element={<Navigate to="/choice" replace />} />
              <Route
                path="/choice"
                element={
                  <>
                    <SignedIn>
                      <Choice />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <>
                    <SignedIn>
                      <Dashboard />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/quiz"
                element={
                  <>
                    <SignedIn>
                      <Quiz />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/result"
                element={
                  <>
                    <SignedIn>
                      <Result />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/quiz-details/:quizId"
                element={
                  <>
                    <SignedIn>
                      <QuizDetails />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App; 