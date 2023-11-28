import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RecipePage from './pages/RecipePage';
import RegisterPage from './pages/RegisterPage';
import IndexPage from './pages/IndexPage';
import CreatePage from './pages/CreatePage';
import CommunityPage from './pages/CommunityPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage'; // Import the ResetPasswordPage
import DisplayRecipe from './pages/DisplayRecipe';
import VerifyEmail from './components/VerifyEmail'; // Import the VerifyEmail component
import AddRecipePage from './components/AddRecipe';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/rec" element={<RecipePage />} />
				<Route path="/reg" element={<RegisterPage />} />
				<Route path="/i" element={<IndexPage />} />
				<Route path="/cre" element={<AddRecipePage />} />
				<Route path="/com" element={<CommunityPage />} />
				<Route path="/verify" element={<VerifyEmail />} />
				<Route path="/forgotPassword" element={<ForgotPasswordPage />} />
				<Route path="/resetPassword" element={<ResetPasswordPage />} />
				<Route path="/dis/:recipeInfo" element={<DisplayRecipe />} />
				{/* Add a route for the VerifyEmail component with a query parameter */}
				<Route path="/addCustomRecipe" element={<AddRecipePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
