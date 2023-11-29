import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CommentBox from './CommentContainer';
import ErrorMessageModal from './ErrorMessageModal';

function DisplayRecipeInfo() {

    const [recipe, setRecipe] = useState('');
    const { recipeInfo } = useParams();

    const [userID, setUserID] = useState(null);

    const [loading, setLoading] = useState(true);

    const [allTags, setAllTags] = useState([]);
    const [author, setAuthor] = useState('');

    const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

    const [commentContent, setCommentContent] = useState('');
    const [comments, setComments] = useState([]);

    const [liked, setLiked] = useState([]);
    const [likeNumber, setLikeNumber] = useState(0);

    const fetchTags = async () => {
        try {
            const response = await fetch('https://megabytes.app/api/tags');
            const data = await response.json();

            if (response.ok) {
                setAllTags(data);
            } else {
                console.error('Error retrieving tags from server');
            }
        } catch (error) {
            console.error('Error connecting to server', error);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await fetch('https://megabytes.app/api/getUser', {
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
                    const response = await fetch('https://megabytes.app/api/getCommentByID', {
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
        let obj = { recipeID: recipeInfo };
        let js = JSON.stringify(obj);
        try {
            const response = await fetch('https://megabytes.app/api/getRecipeByID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: js
            });
            const data = await response.json();
            console.log(data.results);

            if(response.ok){
                setRecipe(data.results);
                //recipe.CommentList = data.results.CommentList;
            }else{
                console.error('Error getting comments');
            }
        } catch(error){
            console.error('Error retrieving recipe', error);
        }
    }

    const fetchUserID = async () => {
        try {
            const storedUser = localStorage.getItem('user_data');

            if (storedUser) {
                const userObject = JSON.parse(storedUser);
                const userId = userObject.id;
                setUserID(userId);
            }

        } catch (error) {
            console.error('Error retrieving userID from cache', error);
        }
    };

    // const deleteRecipe = async () => {
    //     Alert.alert(
    //         'Delete Recipe',
    //         'Are you sure you want to delete this recipe?',
    //         [
    //             {
    //                 text: 'Cancel',
    //                 style: 'cancel'
    //             },
    //             {
    //                 text: 'Yes',
    //                 onPress: async () => {
    //                     try {
    //                         const response = await fetch('http://164.90.130.112:5000/api/deleteRecipe', {
    //                             method: 'POST',
    //                             headers: {
    //                                 'Content-Type': 'application/json',
    //                             },
    //                             body: JSON.stringify({
    //                                 recipeId: recipe._id,
    //                             }),
    //                         });
                            
    //                         if(response.ok){
    //                             navigation.navigate('Home');
    //                         }else{
    //                             console.error('Error deleting recipe');
    //                         }
    //                     } catch(error){
    //                         console.error('Error connecting to database');
    //                     }
    //                 },
    //             },
    //         ],
    //         { cancelable: true }
    //     );
    // };

    const handleAddComment = async () => {

        if(commentContent == ''){
            setErrorMessage('Comment cannot be empty');
			setShowErrorModal(true);
            return;
        }

        try{

            const response = await fetch('https://megabytes.app/api/addComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    recipeId: recipe._id,
                    userId: userID,
                    commentText: commentContent,
                }),
            });

            if(response.ok){
                setCommentContent('');
                handleCommentSubmit();
            }else{
                console.error('Error adding comment');
            }

        } catch(error){
            console.error('Error connecting to database', error);
        }

    };

    useEffect(() => {
        fetchRecipe();
        fetchTags();
        fetchUserID();
      }, []); 
    
      useEffect(() => {
        if (recipe) {
          fetchUser();
          fetchComments();

          setLikeNumber(recipe.LikeList.length);
          setLiked(recipe.LikeList.includes(userID));

        }
      }, [recipe, allTags]);
    
      useEffect(() => {
        setLoading(false);
      }, [comments])


    const toggleLike = async () => {
        try {
			const response = await fetch('https://megabytes.app/api/updateRecipeLikes', {
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
				<p>No comments yet</p>
			);
		}

		const reveresedComments = [...comments].reverse();

		const commentsContent = reveresedComments.map((comment) => (
			<CommentBox key={comment._id} comment={comment} />
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

    const closeErrorModal = () => {
		setShowErrorModal(false);
	}

    if(loading){
        return null;
    }

    return (

        
        <div style={{
            backgroundColor: '#FFF0DC',
            height: '100vh',
            overflowY: 'auto',
        }}>
            {/* Container */}
            <div style={{
                flex: 1,
                padding: 10,
                paddingTop: 60,
                marginRight: '15%',
                marginLeft: '15%',
            }}>
                
                {/* Top Row */}
                <div style={{
                    display: 'flex',
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: 'black'
                }}>
                    {/* Author Text  */}
                    <div style={{
                        padding: 2,
                        marginBottom: 10,
                        width: '70%', 
                        borderBottomWidth: 1,
                        borderBottomColor: 'black',
                    }}>
                        <p style={{
                            fontSize: 32,
                            fontFamily: 'Tilt-Neon',
                            color: 'gray',
                        }}>u/{author}</p>
                    </div>

                    {/* Emojis on the right side */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        {recipe.AI_Generated && (
                            <p style={{
                                fontSize: 32,
                            }}>🤖</p>
                        )}
                        {recipe.IsPublic && (
                            <p style={{
                                fontSize: 32,
                            }}>🌍</p>
                        )}
                    </div>
                </div>
                
                {/* Title and Tags  */}
                <div style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 10,
                    marginBottom: 10,
                    backgroundColor: '#FFE6C5',
                }}>
                    <p style={{
                        fontSize: 24,
                        width: '90%',
                    }}>
                        {recipe.RecipeName}
                    </p>
                    
                    {allTags.length > 0 && (
                        <div style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 5,
                            borderTopWidth: 1,
                            borderTopColor: 'gray',
                        }}>
                            {recipe.TagList && recipe.TagList.length > 0 && (
                                recipe.TagList.map((val) => (
                                    <div className='inline-block' key={val}>
                                        <p className='text-sm rounded text-center' style={{ backgroundColor: allTags[val].color, marginLeft: 5, fontSize: 24, padding: 5, marginTop: 5, }}>{allTags[val].name}{allTags[val].emoji}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    
                </div>
                
                {/* Content  */}
                <div style={{
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
                    overflow: 'scroll',
                }}>
                    <pre style={{
                        fontSize: 16,
                    }}>
                        {recipe.RecipeContents}
                    </pre>
                </div>

                {/* Bottom Bar  */}
                <div style={{
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
                }}>

                    {/* Like Button and Like Count Container */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                    {/* Like Button */}
                        <button
                            style={{
                                fontSize: 32,
                                color: liked ? 'lime' : 'black',
                                cursor: 'pointer',
                            }}
                            onClick={toggleLike}
                        >
                            {liked ? '▲' : '▲'}
                        </button>

                        {/* Like Count */}
                        <p style={{ marginLeft: 5, fontSize: 32 }}>{likeNumber}</p>
                    </div>


                </div>

                {/* Add Comment */}
                <div style={{
                    flex: 1,
                    flexDirection: 'column',
                    borderWidth: 1,
                    borderRadius: 15,
                    backgroundColor: '#FFE6C5',
                    marginTop: 20,
                    marginBottom: 20,
                    width: '40%',
                    height: 150,
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'space-between', // Align items vertically with space between
                }}>
                    {/* Add Comment Input */}
                    <textarea
                        placeholder="Add a comment..."
                        style={{
                            marginBottom: 10,
                            marginLeft: 10,
                            padding: 10,
                            fontSize: 16,
                            border: 'none',
                            borderRadius: 5,
                            backgroundColor: '#FFF0DC',
                            width: '90%', 
                            height: '70%', 
                        }}
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    />

                    {/* Submit Button */}
                    <button
                        style={{
                            backgroundColor: '#E79B11',
                            padding: 10,
                            borderRadius: 15,
                            borderWidth: 0.5,
                            borderColor: 'black',
                            alignSelf: 'flex-end',
                        }}
                        onClick={handleAddComment}
                    >
                        Add Comment
                    </button>
                </div>

                <div style={{
                    marginTop: 60,
                    flex: 1,
                    marginBottom: 60,
                }}>
                    <div style={{
                        borderBottomWidth: 0.5,
                        width: '50%',
                        borderColor: 'gray',
                        marginBottom: 5,
                    }}>
                        <p style={{
                            fontSize: 18,
                            fontFamily: 'Tilt-Neon',
                            marginBottom: 5,
                        }}>Comments</p>
                    </div>
                    {renderComments()}
                </div>

                <ErrorMessageModal visible={showErrorModal} message={errorMessage} onClose={closeErrorModal} />
            

            </div>
        </div>
        
    );

}

export default DisplayRecipeInfo;