import React, { useState, useEffect } from 'react';
import TagComponent from './TagComponent';

function TagSelectionModal({ visible, onClose, onUpdateRecipeTags, currentTags }) {
	const [tags, setTags] = useState([]);
	const [recipeTags, setRecipeTags] = useState(currentTags || []);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchTags = async () => {
			try {
				const response = await fetch('http://164.90.130.112:5000/api/tags');
				const data = await response.json();

				if (response.ok) {
					setTags(data);
				} else {
					console.error('Error retrieving tags from server');
				}
			} catch (error) {
				console.error('Error connecting to server', error);
			} finally {
				setLoading(false);
			}
		};

		fetchTags();
	}, []);

	useEffect(() => {
		onUpdateRecipeTags(recipeTags);
	}, [recipeTags, onUpdateRecipeTags]);

	const toggleTagSelection = (tagIndex) => {
		if (recipeTags && recipeTags.includes(tagIndex)) {
			setRecipeTags(recipeTags.filter(index => index !== tagIndex));
			console.log(recipeTags);
		} else {
			setRecipeTags([...recipeTags, tagIndex]);
			console.log(recipeTags);
		}

		if (loading) {
			return null;
		}

		return (
			<div className={`fixed inset-0 flex items-center justify-center ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
				<div className="bg-white p-12 rounded-lg w-128 max-h-80 overflow-y-auto overflow-x-hidden shadow-lg">
					<div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
						<h2 className="text-xl font-semibold text-gray-800">Tags</h2>
						<button className="p-2 cursor-pointer" onClick={onClose}>
							<span className="text-gray-600">X</span>
						</button>
					</div>
					<div className="grid grid-cols-3 gap-4 mt-4">
						{tags.map((item, index) => (
							<button
								key={index}
								className={`mx-2 mb-2 overflow-hidden ${recipeTags.includes(index) ? 'bg-gray-300' : ''}`}
								onClick={() => toggleTagSelection(index)}
							>
								<TagComponent name={item.name} emoji={item.emoji} color={item.color} isSelected={recipeTags.includes(index)} />
							</button>
						))}
					</div>
					<div className="mt-4">{JSON.stringify(recipeTags)}</div>
				</div>
			</div>
		);
	}
}
export default TagSelectionModal;