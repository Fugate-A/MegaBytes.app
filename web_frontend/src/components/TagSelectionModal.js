import React, { useState, useEffect } from 'react';
import TagComponent from './TagComponent';

function TagSelectionModal({ visible, onClose, onUpdateRecipeTags, currentTags }) {
	const [tags, setTags] = useState([]);
	const [recipeTags, setRecipeTags] = useState(currentTags);

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
			}
		};

		fetchTags();
	}, []);

	useEffect(() => {
		onUpdateRecipeTags(recipeTags);
	}, [recipeTags, onUpdateRecipeTags]);

	const toggleTagSelection = (tagIndex) => {

		if (recipeTags.includes(tagIndex)) {
			setRecipeTags(recipeTags.filter(index => index !== tagIndex));

		} else {
			setRecipeTags([...recipeTags, tagIndex]);
		}

		onUpdateRecipeTags(recipeTags);
	};

	const renderItem = ({ item, index }) => {
		const isSelected = recipeTags.includes(index);

		return (
			<TouchableOpacity
				style={[styles.tagItem]}
				onPress={() => toggleTagSelection(index)}
			>
				<TagComponent
					name={item.name}
					emoji={item.emoji}
					color={item.color}
					isSelected={isSelected}
				/>
			</TouchableOpacity>
		);
	};

	return (
		<div className={`fixed inset-0 flex items-center justify-center ${visible ? 'visible' : 'invisible'}`}>
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<div className="bg-white p-8 rounded-lg w-90 max-h-80">
				<button className="absolute top-4 right-4 p-2 cursor-pointer" onClick={onClose}>
					X
				</button>
				<div className="grid grid-cols-2 gap-4">
					{tags.map((item, index) => (
						<button key={index} className="m-2" onClick={() => toggleTagSelection(index)}>
							{renderItem({ item, index })}
						</button>
					))}
				</div>
				<div className="mt-4">{JSON.stringify(recipeTags)}</div>
			</div>
		</div>
	);
}

export default TagSelectionModal;
