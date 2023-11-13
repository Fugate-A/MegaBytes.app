require('express');
require('mongodb');

const { ObjectId } = require('mongodb');

exports.setApp = function (app, client) {
	app.post('/api/register', async (req, res, next) => {
		// incoming:  username, password, email
		// outgoing: error
		const { username, password, email } = req.body;
		const newUser = { UserID: Date.now(), Username: username, Password: password, Email: email };
		var error = '';
		try {
			const db = client.db('MegaBitesLibrary');
			db.collection('User').insertOne(newUser);
		}
		catch (e) {
			error = e.toString();
		}
		var ret = { error: error };
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

	app.post('/api/addRecipe', async (req, res) => {
		// incoming: userId, recipeName, recipeContents, tagList, likeList
		// outgoing: error
	  
		const { userId, recipeName, recipeContents, tagList, likeList } = req.body;
		const newRecipe = {
		  UserId: new ObjectId(userId),
		  RecipeName: recipeName,
		  RecipeContents: recipeContents,
		  TagList: tagList,
		  LikeList: likeList,
		};
	  
		try {
		  const db = client.db('MegaBitesLibrary');
	  
		  // Insert new recipe into Recipes collection
		  const insertResult = await db.collection('Recipes').insertOne(newRecipe);

		  const recipeId = insertResult.insertedId;
	  
		  // Update the user's RecipeList with the new recipe
		  const updateResult = await db.collection('User').updateOne(
			{ _id: new ObjectId(userId) },
			{ $push: { RecipeList: {_id: recipeId} } }
		  );
			
		  console.log(updateResult);

		  res.status(200).json({ error: null });
		} catch (error) {
		  console.error(error);
		  res.status(500).json({ error: 'Internal Server Error' });
		}
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

	app.post('/api/getUserRecipes', async(req, res, netx) => {
		// incoming: userID
		// outgoing: results[], error

		try {
			const { userID } = req.body;

			if(!userID){
				return res.status(400).json({error: 'userID is required'});
			}

			const db = client.db('MegaBitesLibrary');

			const user = await db.collection('User').findOne({_id: new ObjectId(userID)});

			if(!user){
				return res.status(404).json({error: 'User not found'});
			}

			const recipeList = user.RecipeList || [];

			const recipeIds = recipeList.map(recipe => recipe._id);

			res.json({results: recipeIds, error: ''});
		} catch(error){
			console.error(error);
			res.status(500).json({error: 'Internal error'});
		}
	});

	app.post('/api/getRecipeByID', async(req, res, next) => {
		// incoming recipeID
		// outgoing: recipe, error

		try {
			const { recipeID } = req.body;

			if(!recipeID){
				return res.status(400).json({error: 'recipeID is required'});
			}

			const db = client.db('MegaBitesLibrary');

			const recipe = await db.collection('Recipes').findOne({_id: new ObjectId(recipeID)});

			if(!recipe){
				return res.status(404).json({error: 'Recipe not found'});
			}

			res.json({results: recipe, error: ''});
		} catch(error){
			console.error(error);
			res.status(500).json({error: 'Internal error'});
		}

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

	app.post('/api/addComment', async (req, res, next) => {
		// incoming: recipeId, userId, commentId, commentText
		// outgoing: error

		var error = '';
		const { recipeId, userId, commentId, commentText } = req.body;
		const newComment = {
			RecipeId: recipeId, UserId: userId, CommentId: commentId, CommentText: commentText
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