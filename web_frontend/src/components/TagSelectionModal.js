import React, { useState, useEffect } from 'react';
import TagComponent from './TagComponent';

function TagSelectionModal({ visible, onClose, onUpdateRecipeTags, currentTags }) {
	const [tags, setTags] = useState([]);
	const [recipeTags, setRecipeTags] = useState(currentTags || []);
	const [loading, setLoading] = useState(true);
	
	const fetchTags = async () => {
		try {
			const response = await fetch('https://megabytes.app/api/tags');
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
	
	useEffect(() => {
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
			<button
				className="m-2"
				onClick={() => toggleTagSelection(index)}
			>
				<TagComponent
					name={item.name}
					emoji={item.emoji}
					color={item.color}
					isSelected={isSelected}
				/>
			</button>
		);
	};

	if (loading) {
		return null;
	}

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center ${
				visible ? 'visible' : 'invisible'
			}`}
		>
			
			<div style={{
				backgroundColor: '#E3E3E3',
				padding: 20,
				borderRadius: 15,
				width: '70%',
				height: '70%',
			}}>
				<div style={{
					display: 'flex',
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: 'black'
				}}>
					<p style={{
						marginRight: 5,
						fontSize: 36,
						
					}}>Tags</p>
					<button
						onClick={onClose}
						style={{
							marginTop: 5,
							fontSize: 36,
							color: 'blue'
						}}
					>
						X
					</button>
				</div>

				<div style={{
					width: '80%',
					maxHeight: '80%',
					overflow: 'auto',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					marginLeft: '10%'
				}}>
					{tags.map((item, index) => (
						renderItem({item, index})
					))}
				</div>
				
				
			</div>
		</div>
	);

}

export default TagSelectionModal;