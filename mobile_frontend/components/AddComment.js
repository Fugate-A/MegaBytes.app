import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text,TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddComment({ recipe, onCommentSubmit }) {
    const navigation = useNavigation();

    const [content, setContent] = useState('');

    const handleAddComment = async () => {

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
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
               


                
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
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