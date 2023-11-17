import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text,TextInput, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddComment() {
    const navigation = useNavigation();
    const userID = AsyncStorage.getItem('userID');

    const route = useRoute();
    const { recipe } = route.params;

    const [content, setContent] = useState('');

    const handleAddComment = async () => {

        try{
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
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#FFF0DC',
        padding: 10,
    },
    inputContainer: {
        padding: 10,
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
});

export default AddComment;