import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TagComponent from '../components/TagComponent';
import AddComment from '../components/AddComment';
import CommentContainer from '../components/CommentContainer';

function RecipePage() {
    const navigation = useNavigation();
    const userID = AsyncStorage.getItem('userID')._j;

    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const { recipe } = route.params;

    const [allRecipeTags, setAllRecipeTags] = useState([]);
    const [author, setAuthor] = useState('');

    const [comments, setComments] = useState([]);

    const [liked, setLiked] = useState(recipe.LikeList.includes(userID));
    const [likeNumber, setLikeNumber] = useState(recipe.LikeList.length || 0);

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

    const fetchComments = async () => {
        try {
            const allComments = await Promise.all(
                recipe.CommentList.map(async (commentID) => {
                    const response = await fetch('http://164.90.130.112:5000/api/getCommentByID', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            commentID: commentID._id,
                        }),
                    });
                    const commentData = await response.json();

                    if(response.ok){
                        return commentData.results;
                    }else{
                        console.error('Failed to fetch comment details', commentData.error);
                        return null;
                    }
                })
            );
            setComments(allComments.filter(comment => comment != null));
        } catch(error){
            console.error('Error fetching comments', error);
        }
    }

    const fetchRecipe = async () => {
        try {
            const response = await fetch('http://164.90.130.112:5000/api/getRecipeByID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipeID: recipe._id,
                }),
            });
            const data = await response.json();

            if(response.ok){
                recipe.CommentList = data.results.CommentList;
            }else{
                console.error('Error getting comments');
            }
        } catch(error){
            console.error('Error retrieving recipe', error);
        }
    }

    const deleteRecipe = async () => {


        Alert.alert(
            'Delete Recipe',
            'Are you sure you want to delete this recipe?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const response = await fetch('http://164.90.130.112:5000/api/deleteRecipe', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    recipeId: recipe._id,
                                }),
                            });
                            
                            if(response.ok){
                                navigation.navigate('Home');
                            }else{
                                console.error('Error deleting recipe');
                            }
                        } catch(error){
                            console.error('Error connecting to database');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {

        fetchComments();
        fetchTags();
        fetchUser();

        setLoading(false);
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

    const renderComments = () => {
        if (comments.length === 0) {
            return (
                <Text style={styles.noCommentsText}>No comments yet</Text>
            );
        }

        const reveresedComments = [...comments].reverse();

        const commentsContent = reveresedComments.map((comment) => (
            <CommentContainer key={comment._id} comment={comment} />
        ));

        return commentsContent;
    };

    const handleCommentSubmit = async () => {
        try {
            await fetchRecipe();
            await fetchComments();
            renderComments(); 
        } catch (error) {
            console.error('Error fetching comments', error);
        }
    };

    if(loading){
        return null;
    }

    return (

        <ScrollView style={styles.container}>
        
            <View style={styles.topBar}>
                <View style={styles.recipeAuthorContainer}>
                    <Text style={styles.recipeAuthorText}>u/{author}</Text>
                </View>

                {(userID == recipe.UserID) && (
                    <TouchableOpacity style={styles.deleteButton} onPress={deleteRecipe}>
                        <Text style={styles.deleteButtonText}>Delete Recipe</Text>
                    </TouchableOpacity>
                )}


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
                    <Text style={[styles.likeButton, liked && styles.likedButton]}>⇧</Text>
                </TouchableOpacity>
                <Text style={[styles.likeCount, liked && styles.likedCount]}>{likeNumber}</Text>
            </View>

            <View style={styles.addCommentContainer}>
                <AddComment recipe={recipe} onCommentSubmit={handleCommentSubmit}/>
            </View>

            <View style={styles.commentSection}>
                <View style={styles.commentSectionHeader}>
                    <Text style={styles.commentSectionText}>Comments</Text>
                </View>
                {renderComments()}
            </View>

            <View style={styles.emojiContainer}>
                {recipe.AI_Generated && (
                    <Text style={styles.emojiText}>🤖</Text>
                )}
                {recipe.IsPublic && (
                    <Text style={styles.emojiText}>🌍</Text>
                )}
            </View>
            

        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF0DC',
        padding: 10,
        paddingTop: 40,
    },
    recipeAuthorContainer: {
        padding: 10,
        marginBottom: 10,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingRight: 10,
    },
    recipeAuthorText: {
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
        color: 'gray',
    },
    recipeTitleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#FFE6C5',
    },
    recipeTitleText: {
        fontSize: 24,
        fontFamily: 'Tilt-Neon',
        width: '90%',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },
    recipeContentContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderRightWidth: 1,
        borderRightColor: 'gray',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        backgroundColor: '#FFE6C5',
    },
    recipeContentText: {
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
    },
    extrasBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderRightWidth: 1,
        borderRightColor: 'gray',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
        padding: 10,

        paddingHorizontal: 20,
        backgroundColor: '#FFE6C5',
        
    },
    likeButton: {
        fontSize: 24,
        fontFamily: 'Tilt-Neon',
        color: 'gray',
        marginRight: 10,
        marginTop: -5,
    },
    likedButton: {
        color: 'green',
    },
    deleteButton: {
        backgroundColor: 'red',
        alignItems: 'cemter',
        justifyContent: 'center',
        borderRadius: 15,
        padding: 5,
        height: 30,
    },  
    deleteButtonText: {
        fontSize: 14,
        fontFamily: 'Tilt-Neon',
        color: 'white',
    },
    likeCount: {
        fontSize: 24,
        fontFamily: 'Tilt-Neon',
        color: 'gray',
    },
    likedCount: {
        color: 'green',
    },
    addCommentContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    commentSection: {
        flex: 1,
        marginBottom: 60,
    },
    commentSectionHeader: {
        borderBottomWidth: 0.5,
        width: '50%',
        borderColor: 'gray',
        marginBottom: 5,
    },
    commentSectionText: {
        fontSize: 18,
        fontFamily: 'Tilt-Neon',
        marginBottom: 5,
    },
    emojiContainer: {
        position: 'absolute',
        flexDirection: 'row',
        top: 60,
        right: 5,

    },
    emojiText: {
        fontSize: 15,
    },
});

export default RecipePage;