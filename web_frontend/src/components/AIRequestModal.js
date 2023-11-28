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
                    recipeName: foodInput
                }),
            });

            const data = await response.json();

            if(response.ok){

                const formattedIngredients = data.Ingredients.map((ingredient) => `- ${ingredient}`).join('\n');
                const formattedDirections = data.Directions.map((direction) => `- ${direction}`).join('\n');
                const combinedContent = `Ingredients\n${formattedIngredients}\n\nDirections\n${formattedDirections}`;
                
                handleAIInput(data.RecipeName, combinedContent);

            } else{
                console.error('Error getting recipe information');
            }
        } catch(error){
            console.error('Error connecting to database', error);
        } finally {

            setLoading(false);
            setInputFrozen(false); 

            onClose(); 
        }
    }


	return (
		<div
		className={`fixed inset-0 flex items-center justify-center ${
			visible ? 'visible' : 'invisible'
		}`}
		>
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<div className="bg-yellow-500 rounded-lg p-6 text-center z-10">
				<p className="text-gray-800 font-bold text-lg mb-4"></p>
				<button
				className="text-blue-500 underline text-sm cursor-pointer"
				onClick={onClose}
				>
				Close
				</button>
			</div>
		</div>
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
