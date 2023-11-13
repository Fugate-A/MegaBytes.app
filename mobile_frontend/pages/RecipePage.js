import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

import GlutenFreeTag from '../components/tags/GlutenFreeTag';

function RecipePage() {
    const route = useRoute();
    const { recipe } = route.params;

    const [liked, setLiked] = useState(false);
    const [likeNumber, setLikeNumber] = useState(recipe.LikeList.length || 0);

    const toggleLike = () => {
        if(liked){
            setLiked(false);
            setLikeNumber(likeNumber - 1);
        }else{
            setLiked(true);
            setLikeNumber(likeNumber + 1);
        }
    }

    return (
        <ScrollView style={styles.container}>
            
            <View style={styles.recipeAuthorContainer}>
                <Text style={styles.recipeAuthorText}>u/{recipe.author}</Text>
            </View>

            <View style={styles.recipeTitleContainer}>
                <Text style={styles.recipeTitleText}>{recipe.RecipeName}</Text>
                <GlutenFreeTag />
            </View>
            
            <View style={styles.recipeContentContainer}>
                <Text style={styles.recipeContentText}>{recipe.RecipeContents}</Text>
            </View>

            <View style={styles.extrasBar}>
                <TouchableOpacity onPress={toggleLike}>
                    <Text style={[styles.likeButton, liked && styles.likedButton]}>Like</Text>
                </TouchableOpacity>
                <Text style={styles.likeCount}>{likeNumber}</Text>
            </View>
            

        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF0DC',
        padding: 10,
    },
    recipeAuthorContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        padding: 10,
        marginBottom: 10,
    },
    recipeAuthorText: {
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
        color: 'gray',
    },
    recipeTitleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        padding: 10,
        marginBottom: 10,
    },
    recipeTitleText: {
        fontSize: 24,
        fontFamily: 'Tilt-Neon',
        width: '90%',
    },
    recipeContentContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderRightWidth: 1,
        borderRightColor: 'gray',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
        padding: 10,
    },
    recipeContentText: {
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
    },
    extrasBar: {
        flexDirection: 'col',

        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderRightWidth: 1,
        borderRightColor: 'gray',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
        padding: 10,
    },
    likeButton: {
        fontSize: 16,
        fontFamily: 'Tilt-Neon',
        color: 'gray',
    },
    likedButton: {
        color: 'green',
    },
    likeCount: {
        fontSize: 16,
        fontFamily: 'Tilt-Neon',
        color: 'gray',
    }
});

export default RecipePage;