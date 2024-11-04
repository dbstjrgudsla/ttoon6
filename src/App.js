import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import TermsPage from './pages/TermsPage';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import AddToonPage from './pages/AddToonPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginModal isOpen={true} onClose={() => {}} />} />
        <Route path="/terms" element={<TermsPage />} />
        {/* 조건부 리다이렉트: 토큰이 있을 경우 HomePage로 이동 */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <MainPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/addtoon" element={<AddToonPage />} />
      </Routes>
    </Router>
  );
};

export default App;
