import React from 'react';
import DisplayRecipeInfo from '../components/DisplayRecipeInfo';
import NavBar from '../components/Navbar';
const RecipePage = () => {
	return (
		<div className=' h-screen'>
			<NavBar />
			<DisplayRecipeInfo />
		</div>
	);
};
export default RecipePage;