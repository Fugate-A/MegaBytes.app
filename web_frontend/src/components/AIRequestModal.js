import React, { useState } from 'react';

const AIRequestModal = ({ visible, onClose, handleAIInput }) => {
	const [foodInput, setFoodInput] = useState('');
	const [inputFrozen, setInputFrozen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleGetRecipeFromAI = async () => {
		try {
			setLoading(true);
			setInputFrozen(true);

			const response = await fetch('http://164.90.130.112:5000/api/gpt_recipe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					recipeName: foodInput,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				const formattedIngredients = data.Ingredients.map((ingredient) => `- ${ingredient}`).join('\n');
				const formattedDirections = data.Directions.map((direction) => `- ${direction}`).join('\n');
				const combinedContent = `Ingredients\n${formattedIngredients}\n\nDirections\n${formattedDirections}`;

				handleAIInput(data.RecipeName, combinedContent);
			} else {
				console.error('Error getting recipe information');
			}
		} catch (error) {
			console.error('Error connecting to database', error);
		} finally {
			setLoading(false);
			setInputFrozen(false);
			onClose();
		}
	};

	return (
		<div className={`fixed inset-0 flex items-center justify-center ${visible ? 'visible' : 'invisible'}`}>
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<div className="bg-yellow-200 rounded-lg p-6 text-center z-10 relative">
				<button
					className="absolute top-2 right-2 text-xl cursor-pointer"
					onClick={onClose}
					disabled={inputFrozen || loading}
				>
					x
				</button>
				<p className="text-gray-800 font-bold text-lg mb-4">What Are You Hungry For?</p>
				<div className="mb-4">
					<input
						type="text"
						value={foodInput}
						onChange={(e) => setFoodInput(e.target.value)}
						placeholder="Enter recipe name"
						className="p-2 border border-gray-300 rounded"
						disabled={inputFrozen}
					/>
				</div>
				<button
					className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
					onClick={handleGetRecipeFromAI}
					disabled={inputFrozen || loading}
				>
					{loading ? 'Loading...' : 'Submit'}
				</button>
			</div>
		</div>
	);
};

export default AIRequestModal;
