import React, { useState } from 'react';
import { Modal, View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import ErrorMessageModal from '../components/ErrorMessageModal';

function ForgotPasswordModal({ visible, onClose }) {
    
    const [email, setEmail] = useState('');

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendPasswordEmail = async () => {

        if(!email || !email.includes('@')){
            setErrorMessage('Enter a valid email address');
            setShowErrorModal(true);
            return;
        }

        try {

            const response = await fetch('http://164.90.130.112:5000/api/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    email: email
                }),
            });

            if(response.ok){
                setErrorMessage('An verification link has been sent to your email.');
				setShowErrorModal(true);
                onClose();

            }else{
                console.error('Error sending email');
            }

        } catch(error){
            console.error(error);
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
            visible={visible}
            animationType='fade'
            transparent={true}
        >
            <TouchableWithoutFeedback onPress={handlePressOutside}>
                <View style={styles.container}>
                    <View style={styles.modalContent}>
                    <ErrorMessageModal
                        visible={showErrorModal}
                        message={errorMessage}
                        onClose={closeErrorModal}
                    />
                        
                        <Text style={styles.modalLabel}>Enter your email address</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                value = {email}
                                placeholder='Email address'
                                onChangeText={(text) => setEmail(text)}
                                style={styles.contentInput}
                                multiline
                            />
                        </View>

                        <TouchableOpacity 
                            onPress={handleSendPasswordEmail}
                            style={styles.submitButton}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>

                        </View>
                    
                </View>
            

            </TouchableWithoutFeedback>

            
        </Modal>
    )
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
        height: 50,
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

export default ForgotPasswordModal;