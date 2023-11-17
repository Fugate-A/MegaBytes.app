import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TagComponent from '../components/TagComponent';
import AddComment from '../components/AddComment';

function RecipePage() {
    const userID = AsyncStorage.getItem('userID')._j;

    const route = useRoute();
    const { recipe } = route.params;

    const [allRecipeTags, setAllRecipeTags] = useState([]);
    const [author, setAuthor] = useState('');

    const [liked, setLiked] = useState(recipe.LikeList.includes(userID));
    const [likeNumber, setLikeNumber] = useState(recipe.LikeList.length || 0);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('http://164.90.130.112:5000/api/tags');
                const data = await response.json();
  
                if (response.ok) {
                    setAllRecipeTags(data);
                } else {
                    console.error('Error retrieving tags from server');
                }
            } catch (error) {
                console.error('Error connecting to server', error);
            }
        };

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
        
        fetchUser();
        fetchTags();
    }, []);

    const toggleLike = async () => {
        try {
			const response = await fetch('http://164.90.130.112:5000/api/updateRecipeLikes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},

				body: JSON.stringify({
					userID: userID,
					recipeID: recipe._id,
				}),
			});

            const data = await response.json();

            if(data.update > 0){
                setLiked(true);
                setLikeNumber(likeNumber + 1);
            }else{
                setLiked(false);
                setLikeNumber(likeNumber - 1);
            }
        } catch(error){
            console.error(error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            
            <View style={styles.recipeAuthorContainer}>
                <Text style={styles.recipeAuthorText}>u/{author}</Text>
            </View>

            <View style={styles.recipeTitleContainer}>
                <Text style={styles.recipeTitleText}>{recipe.RecipeName}</Text>
                
                {allRecipeTags.length > 0 && (
                    <View style={styles.tagsContainer}>
                        {recipe.TagList.map((tag, index) => {
                            return <TagComponent key={index} name={allRecipeTags[tag].name} emoji={allRecipeTags[tag].emoji} color={allRecipeTags[tag].color} />
                        })}
                    </View>
                )}
                
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
            
            <AddComment recipe={recipe} />
            

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