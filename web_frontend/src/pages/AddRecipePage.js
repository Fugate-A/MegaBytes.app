import React, { useEffect } from 'react';
import AddRecipe from '../components/AddRecipe';
const AddRecipePage = () => {

	useEffect(() => {
        console.log('pooop');
    }, []);
	
	return (
		<div className='bg-page-background h-screen'>
			<AddRecipe />
		</div>
	);
};
export default AddRecipePage;