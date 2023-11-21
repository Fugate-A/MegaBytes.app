import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text,TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ErrorMessageModal from './ErrorMessageModal';

function AddComment({ recipe, onCommentSubmit }) {
    const navigation = useNavigation();

    const [content, setContent] = useState('');

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddComment = async () => {

        if(content == ''){
            setErrorMessage('Comment cannot be empty');
			setShowErrorModal(true);
            return;
        }

        try{

            const userID = await AsyncStorage.getItem('userID');
            console.log(userID);

            const response = await fetch('http://164.90.130.112:5000/api/addComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    recipeId: recipe._id,
                    userId: userID,
                    commentText: content,
                }),
            });

            if(response.ok){
                console.log('Comment added successfully');
                onCommentSubmit();
                navigation.navigate('RecipePage', {recipe});
            }else{
                console.error('Error adding comment');
            }

        } catch(error){
            console.error('Error connecting to database', error);
        }

    };

    const closeErrorModal = () => {
		setShowErrorModal(false);
	};

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View>
                    <ErrorMessageModal
                        visible={showErrorModal}
                        message={errorMessage}
                        onClose={closeErrorModal}
                    />

                    <View style={styles.inputContainer}>
                        <TextInput
                            value = {content}
                            placeholder='Comment something...'
                            onChangeText={(text) => setContent(text)}
                            style={styles.contentInput}
                            multiline
                        />
                    </View>

                    <TouchableOpacity 
                        onPress={handleAddComment}
                        style={styles.submittButton}
                        activeOpacity={0.7}
                    >
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            

            </TouchableWithoutFeedback>

            
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF0DC',
        padding: 10,
        marginTop: -5,
    },
    inputContainer: {
        padding: 10,
    },
    contentInput: {
        width: '100%',
        height: 75,
        marginVertical: 10,
        padding: 8,
        fontFamily: 'Tilt-Neon',
        borderWidth: 1,
        borderRadius: 15,
    },
    submittButton: {
        alignSelf: 'flex-end',
        marginRight: 15,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginTop: -10,
    },
});

export default AddComment;