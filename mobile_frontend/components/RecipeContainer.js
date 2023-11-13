import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function RecipeContainer( {recipe} ) {

    return (
        <View style={styles.container}>

            <Text style={styles.recipeTitleText}>{recipe.RecipeName}</Text>
            <Text style={styles.recipeContentText}>{recipe.RecipeContents}</Text>

        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        padding: 15,
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 10,
    },
    recipeTitleText: {
        fontSize: 20,
        fontFamily: 'Tilt-Neon',
    },
    recipeContentText: {
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
    }
});

export default RecipeContainer;