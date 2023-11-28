import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Modal, View, StyleSheet, Text,TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ErrorMessageModal from './ErrorMessageModal';

function AddCommentModal({ visible, recipe, onCommentSubmit, onClose }) {
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
                onCommentSubmit();
                setContent('');
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

    const handlePressOutside = () => {
        dismissKeyboard();
        onClose(); 
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
        >
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <View style={styles.container}>
                    <View style={styles.modalContent}>
                        <ErrorMessageModal
                            visible={showErrorModal}
                            message={errorMessage}
                            onClose={closeErrorModal}
                        />
                        
                        <Text style={styles.modalLabel}>Add Comment</Text>
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
                            style={styles.submitButton}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                        </View>
                    
                </View>
            

            </TouchableWithoutFeedback>

            
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF0DC',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        borderWidth: 2,
    },
    modalLabel: {
        fontSize: 16,
        fontFamily: 'Tilt-Neon',
        marginBottom: 5,
    },
    inputContainer: {
        height: 100,
        marginVertical: 10,
        padding: 8,
        borderWidth: 0.5,
        borderRadius: 15,
        backgroundColor: '#FFE6C5',
    },
    contentInput: {
        width: '100%',
        height: '100%',
        fontFamily: 'Tilt-Neon',
    },
    submitButton: {
        backgroundColor: '#FFE6C5',
        alignSelf: 'flex-end',
        marginTop: 10,
        padding: 10,
        borderRadius: 15,
        borderWidth: 0.5,
    },
    submitButtonText: {
        fontSize: 16,
        fontFamily: 'Tilt-Neon',
    },
  });

export default AddCommentModal;