import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentBox from './CommentContainer.js';

import './DisplayRecipeInfo.css';

function DisplayRecipe() {
  var bp = require('./Path.js');
  const [recipe, setRecipe] = useState('');
  const { recipeInfo } = useParams();

  const [recipeLoaded, setRecipeLoaded] = useState(false);

  const [allTags, setAllTags] = useState([]);

  const [comments, setComments] = useState([]);

  const [author, setAuthor] = useState('');

  const [loading, setLoading] = useState(true);

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

  const FindRecipe = async () => {
    let obj = { recipeID: recipeInfo };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch('https://megabytes.app/api/getRecipeByID', {
        method: 'POST',
        body: js,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = JSON.parse(await response.text());
      if(response.ok){
		setRecipe(res.results);
	  }
    } catch (e) {
      alert(e.toString());
    } finally{
		setRecipeLoaded(true);
	}
  };

  const fetchComments = async () => {
	console.log('Fetching comments');
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

          if (response.ok) {
            return commentData.results;
          } else {
            console.error('Failed to fetch comment details', commentData.error);
            return null;
          }
        })
      );
      setComments(allComments.filter((comment) => comment != null));
    } catch (error) {
      console.error('Error fetching comments', error);
    } 
  };

  const fetchUser = async () => {

	if (!recipe || !recipe.UserId) {
		console.log('No recipe or UserId');
		return;
	  }
	

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

  useEffect(() => {
    FindRecipe();
	fetchTags();
  }, []); 

  useEffect(() => {
	if (recipe) {
		
	  fetchUser();
	  fetchComments();

	
	}
  }, [recipe, allTags]);

  useEffect(() => {
	setLoading(false);
  }, [comments])

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



	if(loading){
        return null;
    }

  return (
    <div className="container">
      <div className="topBar">
		<div className="recipeAuthorContainer">
			<p>u/{author}</p>
		</div>

		

	  </div>

	  <div className="recipeTitleContainer">
		<p>{recipe.RecipeName}</p>

		{recipe.TagList && recipe.TagList.length > 0 && (
          recipe.TagList.map((val) => (
            <div className='inline-block' key={val}>
              <p className='text-sm rounded text-center' style={{ backgroundColor: allTags[val].color }}>{allTags[val].name}{allTags[val].emoji}</p>
            </div>
          ))
        )}

	  </div>

	  <div className="recipe-content-container">
		<pre>{recipe.RecipeContents}</pre>
	  </div>

	  <div className="extrasBar">

	  </div>

	  <div className="commentSection">
		<div className="commentSectionHeader">
			<p>Comments</p>
		</div>
		{renderComments()}
	  </div>

    </div>
  );
}

export default DisplayRecipe;
