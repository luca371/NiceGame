import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordScreen.css';

function PasswordScreen() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const basePath = process.env.PUBLIC_URL || '';
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ruleChecks = [
    { id: 1, text: 'Parola trebuie să conțină 7 litere', check: (p) => (p.match(/[a-zA-Z]/g) || []).length >= 7 },
    { id: 2, text: 'Parola trebuie să conțină 3 caractere speciale (!@. etc)', check: (p) => (p.match(/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/`~;']/g) || []).length >= 3 },
    { id: 3, text: 'Parola trebuie să conțină 4 numere', check: (p) => (p.match(/[0-9]/g) || []).length >= 4 },
    { id: 4, text: 'Adunarea numerelor trebuie să fie egală cu 16', check: (p) => {
      const nums = p.match(/[0-9]/g) || [];
      const sum = nums.reduce((acc, n) => acc + parseInt(n), 0);
      return sum === 16;
    }},
    { id: 5, text: 'Parola trebuie să conțină 3 numere romane', check: (p) => {
      const romanNumerals = p.match(/[IVXLCDM]/g) || [];
      return romanNumerals.length >= 3;
    }},
    { id: 6, text: 'Parola trebuie să conțină locul unde ne-am întâlnit prima dată', check: (p) => p.includes('NoapteaMuzeelor') },
    { id: 7, text: 'Parola trebuie să conțină numărul de țări străine în care am fost împreună', check: (p) => p.includes('10') },
    { id: 8, text: 'Parola trebuie să conțină data primului date', check: (p) => p.toLowerCase().includes('1octombrie') || p.toLowerCase().includes('1 octombrie') },
    { id: 9, text: 'Parola trebuie să conțină faza lunii de la aniversarea noastră de anul trecut', check: (p) => p.includes('🌔') },
    { id: 10, text: 'Parola trebuie să conțină cea mai bună mâncare din lume', check: (p) => p.toLowerCase().includes('pizza') },
    { id: 11, text: 'Parola trebuie să conțină numele noastre invers', check: (p) => p.includes('AixelaAcul') },
    { id: 12, text: 'Parola trebuie să conțină cea mai nouă poreclă a ta', check: (p) => p.includes('Chips') },
    { id: 13, text: 'Parola trebuie să conțină parola', check: (p) => p.includes('ChipsLanDeMexicanChipsLanDeMexicanTupiChips') },
    { id: 14, text: 'Parola trebuie să conțină numele acestui filozof', check: (p) => p.includes('Biju'), hasImage: true, imageSrc: basePath + '/biju.jpg' },
    { id: 15, text: 'Parola trebuie să conțină cele mai frumoase cuvinte', check: (p) => p.toLowerCase().includes('te iubesc') || p.toLowerCase().includes('teiubesc') },
    { id: 16, text: 'Parola trebuie să conțină numele apei care trece prin Vienna', check: (p) => p.toLowerCase().includes('dunarea') || p.toLowerCase().includes('dunărea') },
    { id: 17, text: 'Parola trebuie să conțină capitala Luxemburgului', check: (p) => p.toLowerCase().includes('luxemburg') },
    { id: 18, text: 'Parola trebuie să conțină Da sau Nu în funcție dacă jucătorul din imagine se poate etala sau nu', check: (p) => p.includes('Nu'), hasImage: true, imageSrc: basePath + '/player.jpg' },
    { id: 19, text: 'Parola trebuie să conțină numele de artist al băiatului care cântă melodia', check: (p) => p.includes('Minune'), hasYoutube: true, youtubeId: 'R_S3q2tJNJI' },
    { id: 20, text: 'Parola trebuie să conțină numele personajelor preferate din Friends', check: (p) => p.toLowerCase().includes('monica') && p.toLowerCase().includes('chandler') },
    { id: 21, text: 'Parola trebuie să conțină cea mai bună mișcare de dans 🦀', check: (p) => p.toLowerCase().includes('crabu') },
    { id: 22, text: 'Parola trebuie să conțină numele personajelor faimoase cu melodia asta', check: (p) => p.includes('RossRachel'), hasYoutube: true, youtubeId: 'ujNeHIo7oTE' },
    { id: 23, text: 'Parola trebuie să conțină actorul tău preferat', check: (p) => p.toLowerCase().includes('ian somerhalder') || p.toLowerCase().includes('iansomerhalder') },
    { id: 24, text: 'Parola trebuie să conțină parola îmbrățișării', check: (p) => p.includes('Sexy') },
    { id: 25, text: 'Parola trebuie să conțină meseria reală a doamnei mamăie', check: (p) => p.toLowerCase().includes('interlop') },
    { id: 26, text: 'Parola trebuie să conțină un Da sau Nu dacă ești ofticoasă', check: (p) => p.includes('Da') },
    { id: 27, text: 'Parola trebuie să conțină numele melodiei', check: (p) => p.toLowerCase().includes('clocks'), hasAudio: true, audioSrc: basePath + '/nice.mp3' },
    { id: 28, text: 'Parola trebuie să conțină parola pupicului', check: (p) => p.includes('Laneee') },
    { id: 29, text: 'Parola trebuie să conțină numele unui animaluț care e neglijat și știi foarte bine', check: (p) => p.includes('Keperplatz') },
    { id: 30, text: 'Parola trebuie să conțină numele tău și al meu', check: (p) => p.includes('AlexiaLuca') },
  ];

  const [rules, setRules] = useState(ruleChecks.map(r => ({ ...r, passed: false })));
  const [allPassed, setAllPassed] = useState(false);
  const [unlockedRules, setUnlockedRules] = useState([1]);

  const hearts = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 6,
      size: 1 + Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    const updatedRules = rules.map(rule => ({
      ...rule,
      passed: rule.check(password)
    }));
    setRules(updatedRules);

    const highestUnlocked = Math.max(...unlockedRules);
    const highestRule = updatedRules.find(r => r.id === highestUnlocked);
    if (highestRule?.passed && highestUnlocked < 30) {
      setUnlockedRules(prev => [...prev, highestUnlocked + 1]);
    }

    const allRulesPassed = updatedRules.every(rule => rule.passed);
    setAllPassed(allRulesPassed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const visibleRules = useMemo(() => {
    const unlocked = rules.filter(rule => unlockedRules.includes(rule.id));
    const incomplete = unlocked.filter(rule => !rule.passed);
    const completed = unlocked.filter(rule => rule.passed);
    return [...incomplete, ...completed];
  }, [rules, unlockedRules]);

  return (
    <div className="password-container">
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

      <h1 className="password-title">Ghicește parola înainte să vezi cadoul</h1>

      <div className="password-input-container">
        <input
          type="text"
          className="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Introdu parola..."
        />
      </div>

      <div className="rules-container">
        {visibleRules.map((rule) => (
          <div key={rule.id} className={`rule ${rule.passed ? 'passed' : ''}`}>
            <span className="rule-icon">{rule.passed ? '✅' : '❌'}</span>
            <span className="rule-text">{rule.text}</span>
            
            {rule.hasImage && (
              <div className="rule-media-container">
                <img 
                  src={rule.imageSrc} 
                  alt="Ghicește" 
                  className="rule-image"
                />
              </div>
            )}
            
            {rule.hasYoutube && (
              <div className="rule-media-container">
                <iframe
                  className="rule-youtube"
                  src={`https://www.youtube.com/embed/${rule.youtubeId}`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            
            {rule.hasAudio && (
              <div className="rule-media-container">
                <audio 
                  controls 
                  className="rule-audio"
                >
                  <source src={rule.audioSrc} type="audio/mpeg" />
                  Browser-ul tău nu suportă audio.
                </audio>
              </div>
            )}
          </div>
        ))}
      </div>

      {allPassed && (
        <div className="success-container">
          <h2 className="success-title">Felicitări chips!</h2>
          <p className="success-text">Ai ghicit parola suflet!</p>
          <button className="gift-button" onClick={() => navigate('/gift')}>Vezi Cadoul</button>
        </div>
      )}
    </div>
  );
}

export default PasswordScreen;