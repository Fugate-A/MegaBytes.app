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
			<div>
				<p>
					This portion also doesn't work
				</p>
			</div>
		);
	};

	return (
		<div>
			<p>
				Hello there, I am trying to test the tag selection modal
			</p>
		</div>
	);
};

export default TagSelectionModal;