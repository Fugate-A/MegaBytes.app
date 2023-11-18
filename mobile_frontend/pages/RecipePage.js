import { useRoute, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TagComponent from '../components/TagComponent';
import AddComment from '../components/AddComment';
import CommentContainer from '../components/CommentContainer';

function RecipePage() {
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
            await fetchRecipe(); // Wait for fetchRecipe to complete
            await fetchComments(); // Wait for fetchComments to complete
            renderComments(); // Render comments after both fetchRecipe and fetchComments are done
        } catch (error) {
            console.error('Error fetching comments', error);
        }
    };

    if(loading){
        return null;
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
            
            <View style={styles.addCommentContainer}>
                <AddComment recipe={recipe} onCommentSubmit={handleCommentSubmit}/>
            </View>

            <View style={styles.commentSection}>
                <Text style={styles.commentSectionText}>Comments</Text>
                {renderComments()}
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
    },
    addCommentContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    commentSection: {
        flex: 1,
        marginBottom: 40,
    },
    commentSectionText: {
        fontSize: 18,
        fontFamily: 'Tilt-Neon',
        marginBottom: 5,
    },
});

export default RecipePage;