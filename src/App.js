import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import TermsPage from './pages/TermsPage';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import AddToonPage from './pages/AddToonPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginModal isOpen={true} onClose={() => {}} />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/addtoon" element={<AddToonPage />} />
      </Routes>
    </Router>
  );
};

export default App;