import React from 'react';
import { Target, Lightbulb, Rocket, BookOpen, Code, Atom, Brain, Users } from 'lucide-react';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="landing-title">StemQuiz</h1>
          <p className="hero-text">
            Welcome to the future of learning. We're revolutionizing education through 
            innovative technology and engaging content. Our platform combines cutting-edge 
            technology with proven educational methodologies to create an immersive learning 
            experience for students of all ages.
          </p>
          <button className="hero-button">Take Quiz</button>
        </div>
        <div className="hero-image">
          <img src="hero.jpeg" alt="STEM Education" />
        </div>
      </div>

      <div className="neon-divider"></div>

      {/* What is STEM Section */}
      <div className="stem-section">
        <h2>What is STEM?</h2>
        <div className="stem-content">
          <p>
            STEM stands for Science, Technology, Engineering, and Mathematics. These fields 
            are the foundation of innovation and progress in our modern world. By focusing 
            on STEM education, we prepare students for the challenges and opportunities of 
            the future.
          </p>
          <div className="stem-background"></div>
        </div>
      </div>

      <div className="neon-divider"></div>

      {/* About Platform Section */}
      <div className="landing-section">
        <h2>About Our Platform</h2>
        <div className="cards-container">
          <div className="card">
            <div className="card-icon">
              <Target className="icon" />
            </div>
            <h3>Our Mission</h3>
            <p>To make learning engaging and accessible through innovative quiz-based education.</p>
          </div>
          <div className="card">
            <div className="card-icon">
              <Lightbulb className="icon" />
            </div>
            <h3>Our Vision</h3>
            <p>To become the leading platform for interactive STEM education worldwide.</p>
          </div>
          <div className="card">
            <div className="card-icon">
              <Rocket className="icon" />
            </div>
            <h3>Our Approach</h3>
            <p>Combining cutting-edge technology with proven educational methodologies.</p>
          </div>
        </div>
      </div>

      <div className="neon-divider"></div>

      {/* Meet Our Team Section */}
      <div className="landing-section">
        <h2>Meet Our Team</h2>
        <div className="cards-container">
          <div className="team-card">
            <img src="kathan.jpg" alt="Team Member" className="team-image" />
            <h3>Kathan Vyas</h3>
            <p>22BCP162</p>
          </div>
          <div className="team-card">
            <img src="yatri.jpg" alt="Team Member" className="team-image" />
            <h3>Yatri Gor</h3>
            <p>22BCP176</p>
          </div>
          <div className="team-card">
            <img src="dev.jpg" alt="Team Member" className="team-image" />
            <h3>Dev Patel</h3>
            <p>22BCP185</p>
          </div>
        </div>
      </div>

      <footer className="landing-footer">
        <p>© 2025 StemQuiz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage; 