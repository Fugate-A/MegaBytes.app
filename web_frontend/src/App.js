import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RecipePage from './pages/RecipePage';
import RegisterPage from './pages/RegisterPage';
import IndexPage from './pages/IndexPage';
import CreatePage from './pages/CreatePage';
import CommunityPage from './pages/CommunityPage';
import VerifyEmail from './components/VerifyEmail'; // Import the VerifyEmail component
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/rec" element={<RecipePage />} />
        <Route path="/reg" element={<RegisterPage />} />
        <Route path="/i" element={<IndexPage />} />
        <Route path="/cre" element={<CreatePage />} />
        <Route path="/com" element={<CommunityPage />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
