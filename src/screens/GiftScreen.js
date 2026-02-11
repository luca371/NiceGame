import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './GiftScreen.css';

function GiftScreen() {
  const [isHuman, setIsHuman] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [draggedTile, setDraggedTile] = useState(null);
  const navigate = useNavigate();

  const words = ['Will', 'you', 'be', 'my', 'Valentine?'];

  const hearts = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      size: 1 + Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    const shuffled = [...words]
      .map((word, index) => ({ id: index, word, currentPos: index }))
      .sort(() => Math.random() - 0.5)
      .map((tile, index) => ({ ...tile, currentPos: index }));
    setTiles(shuffled);
  }, []);

  useEffect(() => {
    const isSolved = tiles.length > 0 && tiles.every((tile, index) => tile.id === index);
    if (isSolved && isHuman) {
      setPuzzleSolved(true);
      setTimeout(() => setShowButtons(true), 500);
    }
  }, [tiles, isHuman]);

  const handleDragStart = (e, index) => {
    setDraggedTile(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedTile === null || draggedTile === dropIndex) return;

    const newTiles = [...tiles];
    const temp = newTiles[draggedTile];
    newTiles[draggedTile] = newTiles[dropIndex];
    newTiles[dropIndex] = temp;
    setTiles(newTiles);
    setDraggedTile(null);
  };

  const handleTouchStart = (index) => {
    setDraggedTile(index);
  };

  const handleTouchEnd = (dropIndex) => {
    if (draggedTile === null || draggedTile === dropIndex) {
      setDraggedTile(null);
      return;
    }

    const newTiles = [...tiles];
    const temp = newTiles[draggedTile];
    newTiles[draggedTile] = newTiles[dropIndex];
    newTiles[dropIndex] = temp;
    setTiles(newTiles);
    setDraggedTile(null);
  };

  const handleNoClick = () => {
    if (noClickCount < 10) {
      setNoClickCount(noClickCount + 1);
    }
  };

  const handleDaClick = () => {
    navigate('/surprize');
  };

  const getDaText = () => {
    switch (noClickCount) {
      case 1:
        return 'Normal';
      case 2:
        return 'Normal, sunt foarte entuziasmată';
      case 3:
        return 'De când așteptam, normal că da!';
      case 4:
        return 'Normaaaaaaaaaaaal, ești cel mai tare iubit!';
      case 5:
        return 'Cum adică daaaaaaaaaaaa, normal ești cel mai puternic și definit iubit din toată lumea!';
      case 6:
        return 'Daaaaaaaaaaaaa, ești cel mai amuzant, normal!';
      case 7:
        return 'Doamne, normal ce fericită sunt!';
      case 8:
        return 'Yeeeeeeeeeeiiiiiiii, normal chips!';
      case 9:
        return 'Normallllllll, sunt cea mai fericită și tu ai un abdomen superb și frumos să știi!';
      case 10:
        return '💕 DAAAAA PENTRU TOTDEAUNA 💕';
      default:
        return 'Da';
    }
  };

  const getDaSize = () => {
    switch (noClickCount) {
      case 1:
        return 1.02;
      case 2:
        return 1.04;
      case 3:
        return 1.06;
      case 4:
        return 1.08;
      case 5:
        return 1.1;
      case 6:
        return 1.12;
      case 7:
        return 1.15;
      case 8:
        return 1.18;
      case 9:
        return 1.22;
      case 10:
        return 1.3;
      default:
        return 1;
    }
  };

  const getNoSize = () => {
    switch (noClickCount) {
      case 1:
        return 0.98;
      case 2:
        return 0.95;
      case 3:
        return 0.92;
      case 4:
        return 0.88;
      case 5:
        return 0.83;
      case 6:
        return 0.77;
      case 7:
        return 0.7;
      case 8:
        return 0.6;
      case 9:
        return 0.45;
      case 10:
        return 0;
      default:
        return 1;
    }
  };

  return (
    <div className="gift-container">
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

      <h1 className="gift-title">🎁 Cadoul Tău 🎁</h1>

      {!puzzleSolved && (
        <>
          <div className="captcha-container">
            <label className="captcha-label">
              <input
                type="checkbox"
                checked={isHuman}
                onChange={(e) => setIsHuman(e.target.checked)}
                className="captcha-checkbox"
              />
              <span className="captcha-checkmark"></span>
              <span className="captcha-text">I am human</span>
            </label>
          </div>

          {isHuman && (
            <div className="puzzle-container">
              <p className="puzzle-instruction">Aranjează cuvintele în ordine corectă:</p>
              <div className="puzzle-tiles">
                {tiles.map((tile, index) => (
                  <div
                    key={tile.id}
                    className={`puzzle-tile ${draggedTile === index ? 'dragging' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onTouchStart={() => handleTouchStart(index)}
                    onTouchEnd={() => handleTouchEnd(index)}
                  >
                    {tile.word}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {puzzleSolved && (
        <div className="valentine-container">
          <h2 className="valentine-question">Will you be my Valentine? 💕</h2>
          
          {showButtons && (
            <div className="buttons-container">
              <button
                className="da-button"
                onClick={handleDaClick}
                style={{
                  transform: `scale(${getDaSize()})`,
                  zIndex: 10,
                }}
              >
                {getDaText()}
              </button>
              
              <button
                className="nu-button"
                onClick={handleNoClick}
                style={{
                  transform: `scale(${getNoSize()})`,
                  opacity: getNoSize(),
                  pointerEvents: noClickCount >= 10 ? 'none' : 'auto',
                }}
              >
                Nu
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GiftScreen;