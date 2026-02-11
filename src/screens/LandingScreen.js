import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingScreen.css';

function LandingScreen() {
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    navigate('/game');
  };

  // Generate random hearts
  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    size: 1 + Math.random() * 2,
  }));

  return (
    <div className="landing-container">
      <div className="hearts-background">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              fontSize: `${heart.size}rem`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      <h1 className="title">Alexia !</h1>

      {showWelcome && (
        <div className="welcome-section">
          <p className="welcome-text">Bine ai venit la jocul parolei</p>
          <button className="start-button" onClick={handleStart}>
            Start
          </button>
        </div>
      )}
    </div>
  );
}

export default LandingScreen;