import React from 'react';
import RecipeList from '../components/RecipeList';
import NavBar from '../components/Navbar';
const RecipePage = () => {
	return (
		<div className='bg-page-background h-screen'>
			<NavBar />
			<RecipeList />
		</div>
	);
};
export default RecipePage;