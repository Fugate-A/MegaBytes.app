require('express');
require('mongodb');

exports.setApp = function (app, client) {
	app.post('/api/register', async (req, res, next) => {
	  // incoming: email, password
	  // outgoing: error
	  const { email, password } = req.body;
	  var error = '';
	  try {
		const db = client.db('MegaBitesLibrary');

		// Check if the email is unique
		const existingUser = await db.collection('User').findOne({ email });
		if (existingUser) {
		  return res.status(400).json({ error: 'Email already exists' });
		}
	
		// Create a new user document in MongoDB
		const newUser = { Email: email, Password: password, FirstName: '', LastName: '', Username: '' };
		db.collection('User').insertOne(newUser);
	
		} catch (e) {
			error = e.toString();
	  }
	  var ret = {error: error};
	  res.status(200).json(ret);
	});
	
	app.put('/update-profile/:email', async (req, res) => {
	  const userEmail = req.params.email;
	  const { firstName, lastName, username } = req.body;
	
	  try {
		const db = client.db('MegaBitesLibrary');
	
		// Find the user by email
		const userToUpdate = await db.collection('User').findOne({ email: userEmail });
		if (!userToUpdate) {
		  return res.status(404).json({ error: 'User not found' });
		}
	
		// Update the user's profile
		db.collection('User').updateOne({ email: userEmail }, { $set: { firstName, lastName, username } });
	  
	  } catch (e) {
		error = e.toString();
	  }
	  var ret = {error: error};
	  res.status(200).json(ret);
	});

	app.post('/api/login', async (req, res, next) => {
		// incoming: login, password
		// outgoing: id, error
		var error = '';
		const { username, password } = req.body;
		var id = -1;
		var isEmail = username.includes("@");
		try {
			const db = client.db('MegaBitesLibrary');
			if (isEmail) {
				const results = await 
					db.collection('User').find({ Email: username, Password: password }).toArray();
			}
			else {
				const results = await
					db.collection('User').find({ Username: username, Password: password }).toArray();
			}
			if (results.length > 0) {
				id = results[0]._id;
			}
		}
		catch (e) {
			error = e.message()
		}
		var ret = { id: id, error: '' };
		res.status(200).json(ret);
	});

	app.post('/api/addRecipe', async (req, res, next) => {
		// incoming: userId, recipeName, recipeContents, tagList, likeList
		// outgoing: error

		var error = '';
		const { userId, recipeName, recipeContents,
			tagList, likeList, publicBool } = req.body;
		const newRecipe = {
			UserId: userId, RecipeName: recipeName,
			recipeContents: recipeContents,
			TagList: tagList, LikeList: likeList, Public: publicBool
		};

		try {
			const db = client.db('MegaBitesLibrary');
			db.collection('Recipes').insertOne(newRecipe);
		} catch (e) {
			error = e.toString();
		}

		var ret = { error: error };
		res.status(200).json(ret);
	});

	app.post('/api/deleteRecipe', async (req, res, next) => {
		// incoming: recipeId
		// outgoing: error

		var error = '';
		const { recipeId } = req.body;
		const filter = { RecipeId: recipeId };

		const db = client.db('MegaBitesLibrary');
		db.collection('Recipes').deleteOne(filter, (err, result) => {
			if (err) {
				console.error('Error deleting document:', err);
			} else {
				console.log('Deleted document successfully');
			}
		});

		var ret = { error: error };
		res.status(200).json(ret);
	});

	app.post('/api/getRecipes', async (req, res, next) => {
		// incoming: search
		// outgoing: results[], error

		var error = '';
		const { search } = req.body;
		var _search = search.trim();
		const db = client.db('MegaBitesLibrary');
		const results = await
			db.collection('Recipes').find({
				"RecipeName": {
					$regex: _search + '.*',
					$options: 'i'
				}
			}).toArray();

		var ret = { results: results, error: error };
		res.status(200).json(ret);
	});

	app.post('/api/getRecipeById', async (req, res, next) => {
		// incoming: recipeId
		// outgoing: recipe

		var error = '';
		const { id } = req.body;
		var _id = id.trim();
		const db = client.db('MegaBitesLibrary');
		const result = await db.collection('Recipes').find({"RecipeID": _id});
		var ret = { result: result, error: error };
		res.status(200).json(ret);
	});

	app.post('/api/addComment', async (req, res, next) => {
		// incoming: recipeId, userId, commentId, commentText
		// outgoing: error

		var error = '';
		const { recipeId, userId, commentId, commentText, likeList } = req.body;
		const newComment = {
			RecipeId: recipeId, UserId: userId, CommentId: commentId, CommentText: commentText, LikeList: likeList
		};
		try {
			const db = client.db('MegaBitesLibrary');
			db.collection('Comments').insertOne(newComment);
		} catch (e) {
			error = e.toString();
		}

		var ret = { error: error };
		res.status(200).json(ret);
	});

	app.post('/api/deleteComment', async (req, res, next) => {
		// incoming: recipeId
		// outgoing: error

		var error = '';
		const { commentId } = req.body;
		const filter = { CommentId: commentId };
		const db = client.db('MegaBitesLibrary');
		db.collection('Comments').deleteOne(filter, (err, result) => {
			if (err) {
				console.error('Error deleting document:', err);
			} else {
				console.log('Deleted document successfully');
			}
		});

		var ret = { error: error };
		res.status(200).json(ret);
	});

	/*
	app.post('/api/getComments', async (req, res, next) => {
		// incoming: search
		// outgoing: results[], error

		var error = '';
		const { search } = req.body;
		var _search = search.trim();
		const db = client.db('MegaBitesLibrary');
		const results = await
			db.collection('Comments').find({
				"RecipeName": {
					$regex: _search + '.*',
					$options: 'i'
				}
			}).toArray();

		var ret = { results: results, error: error };
		res.status(200).json(ret);
	});*/
}