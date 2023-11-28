import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ActivityIndicator, StyleSheet, TouchableWithoutFeedback } from 'react-native';

function AIRequestModal ({ visible, onClose, handleAIInput }){

    const [foodInput, setFoodInput] = useState('');

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

                const formattedIngredients = data.Ingredients.map((ingredient) => `- ${ingredient}`).join('\n');
                const formattedDirections = data.Directions.map((direction) => `- ${direction}`).join('\n');
                const combinedContent = `Ingredients\n${formattedIngredients}\n\nDirections\n${formattedDirections}`;
                
                handleAIInput(data.RecipeName, combinedContent);

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
            animationType='fade'
            visible={visible}
        >
            <TouchableWithoutFeedback onPress={() => !inputFrozen && onClose()}>
                <View style={[styles.container, inputFrozen ? styles.frozenContainer : null]}>

                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.modalLabel}>Input a food item</Text>
                        <TextInput 
                            style={[styles.textInput, inputFrozen ? styles.frozenInput : null]}
                            placeholder='What are you hungry for?'
                            placeholderTextColor={'gray'}
                            value={foodInput}
                            onChangeText={(text) => setFoodInput(text)}
                            editable={!inputFrozen}
                            accessibilityLabel="Enter food name"
                        />

                        <TouchableOpacity 
                            onPress={handleGetRecipeFromAI} disabled={inputFrozen}
                            accessible={true}
                            accessibilityRole="button"
                            accessibilityLabel="Submit"
                            style={styles.submitButton}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : (
                                <Text style={styles.submitButtonText}>Submit</Text>
                            )}

                        </TouchableOpacity>
                    </View>


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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalLabel: {
        fontSize: 16,
        fontFamily: 'Tilt-Neon',
        marginBottom: 5,
    },
    frozenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    inputContainer: {
        borderWidth: 2,
        backgroundColor: '#FFF0DC',
        padding: 20,
        borderRadius: 15,
        width: '80%',
        height: 200,
    },
    frozenInput: {
        backgroundColor: 'lightgray',
    },
    textInput: {
        backgroundColor: '#FFE6C5',
        fontSize: 16,
        fontFamily: 'Tilt-Neon',
        borderWidth: 1,
        borderRadius: 15,
        color: 'black',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
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
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
  });

export default AIRequestModal;