import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingScreen from './screens/LandingScreen';
import PasswordScreen from './screens/PasswordScreen';
import GiftScreen from './screens/GiftScreen';
import SurprizeScreen from './screens/SurprizeScreen';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/game" element={<PasswordScreen />} />
        <Route path="/gift" element={<GiftScreen />} />
        <Route path="/surprize" element={<SurprizeScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;