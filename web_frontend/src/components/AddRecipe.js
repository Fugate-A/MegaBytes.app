import React, { useState, useEffect } from 'react';
import ErrorMessageModal from '../components/ErrorMessageModal';
import TagSelectionModal from '../components/TagSelectionModal';
import NavBar from '../components/Navbar';
import AIRequestModal from '../components/AIRequestModal';
import './AddRecipe.css'
const cors = require('cors');


function AddRecipe() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [recipeTags, setRecipeTags] = useState([]);
	const [visibility, setVisibility] = useState(false);
	const [AIgenerated, setAIgenerated] = useState(false);


	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [showTagSelectionModal, setShowTagSelectionModal] = useState(false);

	const [showAIModal, setShowAIModal] = useState(false);


	const [userID, setUserID] = useState(null);
	useEffect(() => {
		const fetchUserID = async () => {
			try {
				const storedUser = localStorage.getItem('user_data');

				if (storedUser) {
					const userObject = JSON.parse(storedUser);
					const userId = userObject.id;
					setUserID(userId);
				}

			} catch (error) {
				console.error('Error retrieving userID from cache', error);
			}
		};

		fetchUserID();
	}, []);

	const handleAddRecipe = async event => {
		try {
			const response = await fetch('https://megabytes.app/api/addRecipe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: userID,
					recipeName: title,
					recipeContents: content,
					tagList: recipeTags || [],
					likeList: [],
					isPublic: visibility,
					ai_generated: AIgenerated,
				}),
			});

			console.log('Adding Recipe');
			const data = await response.json();

			if (response.ok) {
				console.log('Success');
				window.location.href = '/rec';
			} else {
				console.error('Error adding Recipe');

				setErrorMessage('Error adding Recipe');
				setShowErrorModal(true);
			}
		} catch (error) {
			console.error('ERROR CONNECTING TO DATABASE', error);
		}
	};

	const handleUpdateRecipeTags = (updatedTags) => {
		setRecipeTags(updatedTags);
	}

	const handleAIInput = (updatedTitle, updatedContent) => {
		setTitle(updatedTitle);
		setContent(updatedContent);
		setAIgenerated(true);
	}

	const closeErrorModal = () => {
		setShowErrorModal(false);
	}

	const openTagSelectionModal = () => {
		setShowTagSelectionModal(true);
	}

	const toggleVisibility = () => {
		setVisibility(!visibility);
	}

	const openAIModal = () => {
		setShowAIModal(true);
	}

	const closeAIModal = () => {
		setShowAIModal(false);
	}

	const closeTagSelectionModal = () => {
		setShowTagSelectionModal(false);
	}

	return (
		<div id="AddCustomDiv" className='h-screen bg-#FFF0DC'>
			<NavBar />
			<div className='container'>
				<div className='mx-auto text-center'> {/* Corrected classname to className */}
					<h1 className="text-6xl font-bold pt-20">
						Create a Recipe
					</h1>
				</div>
				<div className="mb-3 flex justify-center p-5">
					{/* {<div className="container mx-auto p-4"> */}
					<div className="mt-4 p-4 bg-#FFE6C5 rounded-md w-3/4 border border-black">

						{showAIModal && (
							<AIRequestModal visible={showAIModal} onClose={closeAIModal} handleAIInput={handleAIInput} />
						)}
						{showTagSelectionModal && (
							<TagSelectionModal visible={showTagSelectionModal} onClose={closeTagSelectionModal} onUpdateRecipeTags={handleUpdateRecipeTags} />
						)}
						<button onClick={openAIModal} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl text-3xl">
							Generate with AI
						</button>

						{showAIModal && (
							<AIRequestModal
								visible={showAIModal}
								onClose={closeAIModal}
								handleAIInput={handleAIInput}
							/>
						)}

						<input
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full h-12 p-2 pt-5 pb-4 mb-4 border-b-2 bg-#FFE6C5 border-black text-2xl"
						/>

						<textarea
							placeholder="Ingredients and Directions"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="w-full h-32 p-2 mb-4 border-2 border-gray-400 bg-#FFE6C5 rounded text-2xl"
							rows="4"
						/>

						<button
							onClick={openTagSelectionModal}
							className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl"
						>
							Add Tags
						</button>

						<div className="flex items-center mt-4">
							<span className="mr-2 px-2 font-bold text-2xl">Visibility:</span>
							<button onClick={toggleVisibility} className="flex items-center">
								<div className={`w-4 h-4 px-4 py-4 rounded-full border border-black mr-2 ${visibility ? 'bg-green-500' : 'bg-white'}`} />
								<span className='text-2xl'>{visibility ? 'Public' : 'Private'}</span>
							</button>
						</div>
						<button onClick={handleAddRecipe} className="bg-orange-500 hover:bg-orange-700 text-white float-right text-2xl font-bold py-4 my-5 px-6 rounded-xl">
							Submit
						</button>
					</div>

					<ErrorMessageModal visible={showErrorModal} message={errorMessage} onClose={closeErrorModal} />
					{/* </div>} */}
				</div>
			</div >
		</div>
	);
};
export default AddRecipe;