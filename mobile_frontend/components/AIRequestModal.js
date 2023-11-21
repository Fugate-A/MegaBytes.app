import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ActivityIndicator, StyleSheet, TouchableWithoutFeedback } from 'react-native';

function AIRequestModal ({ visible, onClose, setFinalRecipeName, setFinalRecipeContent }){

    const [foodInput, setFoodInput] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [recipeContent, setRecipeContent] = useState('');
    const [inputFrozen, setInputFrozen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleGetRecipeFromAI = async () => {

        try {
            setLoading(true);
            setInputFrozen(true);
            const response = await fetch('http://164.90.130.112:5000/api/gpt_recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    recipeName: foodInput
                }),
            });

            const data = await response.json();

            if(response.ok){
                setRecipeName(data.RecipeName);

                const formattedIngredients = data.Ingredients.map((ingredient) => `- ${ingredient}`).join('\n');

                const formattedDirections = data.Ingredients.map((direction) => `- ${direction}`).join('\n');

                const combinedContent = `Ingredients\n${formattedIngredients}\n\nDirections\n${formattedDirections}`;
                setRecipeContent(combinedContent);

                setFinalRecipeName(recipeName);
                setFinalRecipeContent(recipeContent);

                onClose();

            } else{
                console.error('Error getting recipe information');
            }
        } catch(error){
            console.error('Error connecting to database', error);
        } finally {
            setLoading(false);
            setInputFrozen(false); 
            onClose(); 
        }
    }


    return (
        <Modal 
            transparent={true}
            animationType='slide'
            visible={visible}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={[styles.container, inputFrozen ? styles.frozenContainer : null]}>
                    <TextInput 
                        style={[styles.textInput, inputFrozen ? styles.frozenInput : null]}
                        placeholder='What are you hungry for?'
                        value={foodInput}
                        onChangeText={(text) => setFoodInput(text)}
                        editable={!inputFrozen}
                    />

                    <TouchableOpacity onPress={handleGetRecipeFromAI} disabled={inputFrozen}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            <Text style={styles.closeButton}>Close</Text>
                        )}
                    </TouchableOpacity>


                </View>    
            </TouchableWithoutFeedback>

            
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputContainer: {

    },
    frozenContainer: {
        backgroundColor: 'gray', 
    },
    frozenInput: {
        backgroundColor: 'lightgray', // Light gray background when input is frozen
    },
    textInput: {
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
    },  
    submitButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
});

export default AIRequestModal;