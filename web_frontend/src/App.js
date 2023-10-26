import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/acc" element={<AccountPage />} />
        <Route path="/reg" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
