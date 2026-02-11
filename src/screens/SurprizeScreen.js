import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurprizeScreen.css';

function SurprizeScreen() {
  const navigate = useNavigate();
  const basePath = process.env.PUBLIC_URL || '';

  const hearts = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      size: 1 + Math.random() * 2,
    }));
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const handleGift = () => {
    window.open('https://app.houseofcb.com/', '_blank');
  };

  return (
    <div className="surprize-container">
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

      <h1 className="surprize-title">Felicitări suflet, ai câștigat!</h1>
      
      <button className="gift-link-button" onClick={handleGift}>
        Vezi Cadoul Tău
      </button>

      <p className="gift-description">Orice de pe acest site este gratuit, tu alegi! 💕</p>

      <button className="back-button" onClick={handleBack}>
        Înapoi la start
      </button>
    </div>
  );
}

export default SurprizeScreen;