import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

import ErrorMessageModal from '../components/ErrorMessageModal';
import TagComponent from '../components/tags/TagComponent';
import TagSelectionModal from '../components/TagSelectionModal';


function AddRecipePage(){
    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [recipeTags, setRecipeTags] = useState([]);

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showTagSelectionModal, setShowTagSelectionModal] = useState(false);

    const [userID, setUserID] = useState(null);
    useEffect( () => {
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
				}),
		});

            console.log('\tAdding Recipe');
            const data = await response.json();

            if(response.ok){
                console.log('\tSuccess');

                navigation.navigate('Home');
            }else{
                console.error('\tError adding Recipe');

                setErrorMessage('Error adding Reicpe');
				setShowErrorModal(true);
            }
        } catch(error) {
            console.error("\tERROR CONNECTING TO DATABASE\n", error);
        }
        

    };

    const handleUpdateRecipeTags = (updatedTages) => {
        setRecipeTags(updatedTages);
    }

	const closeErrorModal = () => {
		setShowErrorModal(false);
	};

    const openTagSelectionModal = () => {
        setShowTagSelectionModal(true);
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0}
		    >
                <TouchableOpacity 
                    onPress={handleAddRecipe}
                    style={styles.submittButton}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Title'
                        value = {title}
                        onChangeText={(text) => setTitle(text)}
                        style={styles.titleInput}
                    />
                    <TextInput
                        placeholder='Ingredients and Directions'
                        value = {content}
                        onChangeText={(text) => setContent(text)}
                        style={styles.contentInput}
                        multiline
                    />

                    <TouchableOpacity onPress={openTagSelectionModal} style={styles.addTagsButton}>
                        <Text>Add Tags</Text>
                    </TouchableOpacity>
                    
                    {showTagSelectionModal && (
                        <TagSelectionModal
                            visible={true}
                            onUpdateRecipeTags={handleUpdateRecipeTags}
                            onClose={() => setShowTagSelectionModal(false)}
                            currentTags={recipeTags}
                        />
                    )}

                    <Text >{JSON.stringify(recipeTags)}</Text>
                </View>

                <ErrorMessageModal
                    visible={showErrorModal}
                    message={errorMessage}
                    onClose={closeErrorModal}
                />

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

        
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#FFF0DC',
        padding: 10,
    },
    inputContainer: {
        padding: 10,
    },
    titleInput: {
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
    contentInput: {
        width: '100%',
        height: '65%',
        marginVertical: 10,
        padding: 8,
        fontFamily: 'Tilt-Neon',
        borderLeftColor: 'grey',
        borderRightColor: 'grey',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 15,
    },
    submittButton: {
        alignSelf: 'flex-end',
        marginRight: 15,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
    },
    addTagsButton: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginTop: 10,
    },
});

export default AddRecipePage;