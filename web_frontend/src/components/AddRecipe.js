import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AddRecipe() {
	const navigate = useNavigate();

	const addCustomRecipe = (event) => {

	};

	return (
		<div id="addCustomRecipeDiv">
			<form onSubmit={addCustomRecipe}>
				<div>
					<label>Title:</label>
					<input type="text" name="title" required />
				</div>
				<div>
					<label>Ingredients:</label>
					<input type="text" name="ingredients" required />
				</div>
				<div>
					<label>Instructions:</label>
					<input type="text" name="instructions" required />
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default AddRecipe;