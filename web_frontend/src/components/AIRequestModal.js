import React, { useState } from 'react';

const AIRequestModal = ({ isOpen, onClose, children }) => {
	const [isModalOpen, setIsModalOpen] = useState(isOpen);

	const closeModal = () => {
		setIsModalOpen(false);
		onClose();
	};

	return (
		<>
			{isModalOpen && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 transition-opacity">
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
						&#8203;
						<div
							className=
							'inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg'
						>
							{children}
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									onClick={closeModal}
									type="button"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AIRequestModal;



















// import React, { useState } from 'react';

// function AIRequestModal({ visible, onClose, handleAIInput }) {
// 	const [foodInput, setFoodInput] = useState('');
// 	const [inputFrozen, setInputFrozen] = useState(false);
// 	const [loading, setLoading] = useState(false);

// 	const handleGetRecipeFromAI = async () => {
// 		try {
// 			setLoading(true);
// 			setInputFrozen(true);
// 			const response = await fetch('http://164.90.130.112:5000/api/gpt_recipe', {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					recipeName: foodInput,
// 				}),
// 			});

// 			const data = await response.json();

// 			if (response.ok) {
// 				const formattedIngredients = data.Ingredients.map((ingredient) => `- ${ingredient}`).join('\n');
// 				const formattedDirections = data.Directions.map((direction) => `- ${direction}`).join('\n');
// 				const combinedContent = `Ingredients\n${formattedIngredients}\n\nDirections\n${formattedDirections}`;

// 				handleAIInput(data.RecipeName, combinedContent);
// 			} else {
// 				console.error('Error getting recipe information');
// 			}
// 		} catch (error) {
// 			console.error('Error connecting to database', error);
// 		} finally {
// 			setLoading(false);
// 			setInputFrozen(false);
// 			onClose();
// 		}
// 	};

// 	return (
// 		<Modal transparent={true} animationType="fade" visible={visible}>
// 			<div
// 				className={classNames(styles.container, inputFrozen && styles.frozenContainer)}
// 			>
// 				<div className={styles.inputContainer}>
// 					<label className={styles.modalLabel} htmlFor="foodInput">
// 						Input a food item
// 					</label>
// 					<TextInput
// 						id="foodInput"
// 						className={classNames(styles.textInput, inputFrozen && styles.frozenInput)}
// 						placeholder="What are you hungry for?"
// 						placeholderTextColor={'gray'}
// 						value={foodInput}
// 						onChange={(e) => setFoodInput(e.target.value)}
// 						disabled={inputFrozen}
// 						aria-label="Enter food name"
// 					/>

// 					<button
// 						onClick={handleGetRecipeFromAI}
// 						disabled={inputFrozen}
// 						aria-label="Submit"
// 						className={styles.submitButton}
// 					>
// 						{loading ? (
// 							<ActivityIndicator size="small" color="#0000ff" />
// 						) : (
// 							<span className={styles.submitButtonText}>Submit</span>
// 						)}
// 					</button>
// 				</div>
// 			</div>
// 		</Modal>
// 	);
// }

// export default AIRequestModal;
