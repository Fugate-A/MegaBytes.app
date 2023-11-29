import React, { useState, useEffect } from 'react';
import ErrorMessageModal from './ErrorMessageModal';
import TagSelectionModal from './TagSelectionModal';
import AIRequestModal from './AIRequestModal';
import './styles.css';
function AddRecipePage() {
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

	const handleAddRecipe = async () => {
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

			if (response.ok) {
				window.location.href = '/rec';
			} else {
				console.error('Error adding Recipe');

				setErrorMessage('Error adding Reicpe');
				setShowErrorModal(true);
			}
		} catch (error) {
			console.error('ERROR CONNECTING TO DATABASE', error);
		}
	};

	const handleUpdateRecipeTags = (updatedTags) => {
		setRecipeTags(updatedTags);
	};

	const handleAIInput = (updatedTitle, updatedContent) => {
		setTitle(updatedTitle);
		setContent(updatedContent);
		setAIgenerated(true);
	};

	const closeErrorModal = () => {
		setShowErrorModal(false);
	};

	const closeAIModal = () => {
		setShowAIModal(false);
	};

	const openAIModal = () => {
		setShowAIModal(true);
	};

	const openTagSelectionModal = () => {
		setShowTagSelectionModal(true);
	};

	const toggleVisibility = () => {
		setVisibility(!visibility);
	};

	return (
		<div style={{ backgroundColor: '#FFF0DC', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<div style={{ width: '60%', padding: '20px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
					<button
						onClick={openAIModal}
						style={{ flex: '1', marginRight: '15px', padding: '10px', backgroundColor: '#51E4E5', borderRadius: '15px', border: 'none' }}
					>
						<p style={{ fontSize: '14px', fontFamily: 'Tilt-Neon', margin: 0 }}>Generate with AI 🤖</p>
					</button>

					{showAIModal && <AIRequestModal visible={showAIModal} onClose={closeAIModal} handleAIInput={handleAIInput} />}

					<button onClick={handleAddRecipe} style={{ flex: '1', padding: '10px', backgroundColor: '#51E564', borderRadius: '15px', border: 'none' }}>
						<p style={{ fontSize: '14px', fontFamily: 'Tilt-Neon', margin: 0 }}>Submit</p>
					</button>
				</div>

				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					style={{
						backgroundColor: '#FFE6C5',
						borderRadius: '15px',
						width: '100%',
						height: '80px',
						marginBottom: '10px',
						padding: '8px',
						fontSize: '30px',
						fontFamily: 'Tilt-Neon',
						fontWeight: 'bold',
						borderBottomColor: 'black',
						borderBottomWidth: '2px',
						border: 'none',
					}}
				/>

				<div style={{
					backgroundColor: '#FFE6C5',
					height: '80%',
					borderRadius: '15px',
				}}>
					<textarea
						placeholder="Ingredients and Directions"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						style={{
							width: '100%',
							height: 150,
							margin: '10px 0',
							padding: '8px',
							fontFamily: 'Tilt-Neon',
							fontSize: '16px',
							borderRightWidth: 1,
							borderRightColor: 'gray',
							backgroundColor: '#FFE6C5'
						}}
					/>
				</div>

				<button
					onClick={openTagSelectionModal}
					style={{
						display: 'flex',
						backgroundColor: '#FFE6C5',
						borderWidth: '0.5px',
						borderRadius: '15px',
						padding: '10px',
						marginTop: '10px',
						width: '60%',
						cursor: 'pointer',
					}}
				>
					<p style={{ fontSize: '20px', fontFamily: 'Tilt-Neon', marginLeft: '10px', color: 'gray' }}>Add Tags</p>
				</button>

				{showTagSelectionModal && (
					<TagSelectionModal visible={true} onUpdateRecipeTags={handleUpdateRecipeTags} onClose={() => setShowTagSelectionModal(false)} currentTags={recipeTags} />
				)}

				<div style={{ backgroundColor: '#FFE6C5', display: 'flex', alignItems: 'center', marginTop: '10px', padding: '10px', borderRadius: '15px', borderWidth: '0.5px' }}>
					<p style={{ fontSize: '16px', marginRight: '10px', fontFamily: 'Tilt-Neon' }}>Privacy:</p>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<button onClick={toggleVisibility} className="flex items-center" style={{ cursor: 'pointer', border: 'none', backgroundColor: 'transparent' }}>
							<div
								className={`w-4 h-4 px-4 py-4 rounded-full border border-black mr-2 ${visibility ? 'bg-green-500' : 'bg-white'}`}
								style={{ cursor: 'pointer' }}
							/>
							<span className="text-2xl">{visibility ? 'Public' : 'Private'}</span>
						</button>
					</div>
				</div>
			</div>

			<ErrorMessageModal visible={showErrorModal} message={errorMessage} onClose={closeErrorModal} />
		</div>
	);
}

export default AddRecipePage;
