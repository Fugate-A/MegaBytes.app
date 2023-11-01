import React from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const ErrorMessageModal = ({ visible, message, onClose }) => {

    return (
        <Modal
            visible = {visible}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.messageText}>{message}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#DD9510',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    messageText: {
        color:'#333',
        fontFamily: 'Tilt-Neon',
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        fontSize: 16,
        marginTop: 10,
        color: '#007bff',
        textDecorationLine:'underline'
    },
  });
  
  export default ErrorMessageModal;