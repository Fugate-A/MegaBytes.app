import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Touchable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ErrorMessageModal from '../components/ErrorMessageModal';
import TagSelectionModal from '../components/TagSelectionModal';
import AIRequestModal from '../components/AIRequestModal';


function AddRecipePage() {
	const navigation = useNavigation();

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [recipeTags, setRecipeTags] = useState([]);
	const [visibility, setVisibility] = useState(false);
	const [AIgenerated, setAIgenerated] = useState(false);

	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [showTagSelectionModal, setShowTagSelectionModal] = useState(false);
	const [showAIModal, setShowAIModal] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);
	const [isTextInputFocused, setIsTextInputFocused] = useState(false);


	const [userID, setUserID] = useState(null);
	useEffect(() => {
		const fetchUserID = async () => {
			try {
				const storedUserID = await AsyncStorage.getItem('userID');
				setUserID(storedUserID);
			} catch (error) {
				console.error('Error retrieving userID from cache', error);
			}
		};

		fetchUserID();
	}, []);

	const handleAddRecipe = async () => {

		try {
			const response = await fetch('http://164.90.130.112:5000/api/addRecipe', {
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

				navigation.navigate('Home');
			} else {
				console.error('Error adding Recipe');

				setErrorMessage('Error adding Reicpe');
				setShowErrorModal(true);
			}
		} catch (error) {
			console.error("ERROR CONNECTING TO DATABASE\n", error);
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
	};

	const closeAIModal = () => {
		setShowAIModal(false);
	}

	const openAIModal = () => {
		setShowAIModal(true);
	}

	const openTagSelectionModal = () => {
		setShowTagSelectionModal(true);
	}

	const toggleVisibility = () => {
		setVisibility(!visibility);
	}

	const dismissKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleScrollBegin = () => {
		setIsScrolling(true);
	};

	const handleScrollEnd = () => {
		setIsScrolling(false);
	};



	return (
		<ScrollView
			style={styles.container}
		>
			<TouchableWithoutFeedback onPress={dismissKeyboard}>

				<View>
					<View style={styles.topButtons}>
						<TouchableOpacity onPress={openAIModal} style={styles.aigenButton}>
							<Text style={styles.aigenButtonText}>Generate with AI 🤖</Text>
						</TouchableOpacity>

						{showAIModal && (
							<AIRequestModal
								visible={showAIModal}
								onClose={closeAIModal}
								handleAIInput={handleAIInput}
							/>
						)}

						<TouchableOpacity
							onPress={handleAddRecipe}
							style={styles.submittButton}
						>
							<Text style={styles.submittButtonText}>Submit</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.inputContainer}>
						<TextInput
							placeholder='Title'
							value={title}
							onChangeText={(text) => setTitle(text)}
							style={styles.titleInput}
							editable={!isScrolling}
						/>

						<View
							style={styles.contentInputContainer}
						>
							<TextInput
								placeholder='Ingredients and Directions'
								value={content}
								onChangeText={(text) => setContent(text)}
								style={[styles.contentInput, isTextInputFocused ? { height: 'auto' } : null]}
								multiline
								editable={!isScrolling}
								scrollEnabled={!isScrolling}
							/>
						</View>

						<TouchableOpacity onPress={openTagSelectionModal} style={styles.addTagsButton}>
							<MaterialCommunityIcons name='tag-plus-outline' size={30} color='black' />
							<Text style={styles.addTagsText}>Add Tags</Text>
						</TouchableOpacity>

						{showTagSelectionModal && (
							<TagSelectionModal
								visible={true}
								onUpdateRecipeTags={handleUpdateRecipeTags}
								onClose={() => setShowTagSelectionModal(false)}
								currentTags={recipeTags}
							/>
						)}

						<View style={styles.visibilityContainer}>
							<Text style={styles.visibilityLabel}>Privacy:</Text>

							<View style={styles.visibilityTextContainer}>
								<TouchableOpacity onPress={toggleVisibility} style={styles.visibilityButton}>
									<View style={[styles.radioCircle, { backgroundColor: visibility ? 'green' : 'white' }]} />
								</TouchableOpacity>
								<Text style={styles.visibilityLabel}>{visibility ? 'Public' : 'Private'}</Text>
							</View>

							<View style={styles.visibilityIconContainer}>
								{visibility ? (
									<MaterialCommunityIcons name='lock-open-outline' size={35} color='black' />
								) : (
									<MaterialCommunityIcons name='lock-outline' size={35} color='black' />
								)}
							</View>

						</View>

					</View>

					<ErrorMessageModal
						visible={showErrorModal}
						message={errorMessage}
						onClose={closeErrorModal}
					/>
				</View>

			</TouchableWithoutFeedback>
		</ScrollView>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: '#FFF0DC',
		padding: 10,
		paddingTop: 40,
	},
	topButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 5,
	},
	aigenButtonText: {
		fontSize: 14,
		fontFamily: 'Tilt-Neon',
	},
	submittButtonText: {
		fontSize: 14,
		fontFamily: 'Tilt-Neon',
	},
	aigenButton: {
		marginRight: 15,
		borderWidth: 1,
		borderRadius: 15,
		padding: 10,
		backgroundColor: '#51E4E5',
	},
	submittButton: {
		marginRight: 15,
		borderWidth: 1,
		borderRadius: 15,
		padding: 10,
		backgroundColor: '#51E564',
	},
	inputContainer: {
		marginTop: -15,
		padding: 10,
	},
	titleInput: {
		backgroundColor: '#FFE6C5',
		borderRadius: 15,
		width: '100%',
		height: 80,
		marginVertical: 10,
		padding: 8,
		fontSize: 30,
		fontFamily: 'Tilt-Neon',
		fontWeight: 'bold',
		borderBottomColor: 'black',
		borderBottomWidth: 2,
	},
	contentInputContainer: {
		backgroundColor: '#FFE6C5',
		height: '65%',
		borderRadius: 15,
		borderLeftColor: 'grey',
		borderRightColor: 'grey',
		borderLeftWidth: 1,
		borderRightWidth: 1,
	},
	contentInput: {
		width: '100%',
		marginVertical: 10,
		padding: 8,
		fontFamily: 'Tilt-Neon',
		padding: 10,
	},
	addTagsText: {
		fontSize: 20,
		fontFamily: 'Tilt-Neon',
		marginLeft: 10,
		color: 'gray',
	},
	addTagsButton: {
		flexDirection: 'row',
		backgroundColor: '#FFE6C5',
		borderWidth: 0.5,
		borderRadius: 15,
		padding: 10,
		marginTop: 10,
		width: '60%',
	},
	visibilityContainer: {
		backgroundColor: '#FFE6C5',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,

		width: 250,
		padding: 10,
		borderRadius: 15,
		borderWidth: 0.5,
	},
	visibilityTextContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 150
	},
	visibilityIconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 35,
		marginLeft: -30,
	},
	visibilityLabel: {
		fontSize: 16,

		marginRight: 10,
		fontFamily: 'Tilt-Neon',
	},
	visibilityButton: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	radioCircle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 1,
		marginRight: 5,
	},
});

export default AddRecipePage;