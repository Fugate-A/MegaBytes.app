import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TagComponent from '../components/tags/TagComponent';

function RecipePage() {
    const userID = AsyncStorage.getItem('userID');

    const route = useRoute();
    const { recipe } = route.params;

    const [recipeTags, setRecipeTags] = useState([]);

    const [liked, setLiked] = useState(recipe.LikeList.includes(userID));
    const [likeNumber, setLikeNumber] = useState(recipe.LikeList.length || 0);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('http://164.90.130.112:5000/api/tags');
                const data = await response.json();
      
                if (response.ok) {
                    setRecipeTags(data);
                } else {
                    console.error('Error retrieving tags from server');
                }
            } catch (error) {
                console.error('Error connecting to server', error);
            }
        };
        
        fetchTags();
    }, []);

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
                
                <View style={styles.tagsContainer}>
                    {tags.map((tag, index) => {
                        return <TagComponent key={index} name={tag.name} emoji={tag.emoji} color={tag.color} />
                    })}
                </View>

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
    tagsContainer: {
        flexDirection: 'row',
        marginTop: 5,
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