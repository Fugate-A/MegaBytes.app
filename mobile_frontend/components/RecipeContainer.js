import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

function RecipeContainer( {recipe} ) {

    const [author, setAuthor] = useState('');

    const fetchUser = async () => {
        try {
            const response = await fetch('http://164.90.130.112:5000/api/getUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    userId: recipe.UserId,
                }),
            });
            const data = await response.json();

            if(response.ok) {
                setAuthor(data.results.Username);
            } else{
                console.error('Error retrieving user');
            }
        } catch(error){
            console.error('Error connecting to database', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.recipeAuthorText}>u/{author}</Text>
                <Text style={styles.recipeTitleText}>{recipe.RecipeName}</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.recipeContentText}>{recipe.RecipeContents}</Text>
            </View>

            <View style={styles.emojiContainer}>
                {recipe.AI_Generated && (
                    <Text style={styles.emojiText}>🤖</Text>
                )}
                {recipe.IsPublic && (
                    <Text style={styles.emojiText}>🌍</Text>
                )}
            </View>

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        padding: 10,
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: '#FFE6C5',
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    body: {
        maxHeight: '80%',
    },
    recipeAuthorText: {
        fontSize: 12,
        fontFamily: 'Tilt-Neon',
    },  
    recipeTitleText: {
        fontSize: 20,
        fontFamily: 'Tilt-Neon',
    },
    recipeContentText: {
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
    },
    emojiContainer: {
        position: 'absolute',
        flexDirection: 'row',
        top: 5,
        right: 5,

    },
    emojiText: {
        fontSize: 15,
    },
});

export default RecipeContainer;