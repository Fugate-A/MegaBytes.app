require('express');
require('mongodb');

exports.setApp = function (app, client) {
	app.post('/api/register', async (req, res, next) => {
		// incoming:  fname, lname, username, password, email
		// outgoing: error
		const { fname, lname, username, password, email } = req.body;
		const newUser = { UserID: Date.now(), FirstName: fname, LastName: lname, Username: username, Password: password, Email: email };
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
		// outgoing: id, firstName, lastName, error
		var error = '';
		const { username, password } = req.body;
		var id = -1;
		var fn = '';
		var ln = '';
		try {
			const db = client.db('MegaBitesLibrary');
			const results = await
				db.collection('User').find({ Username: username, Password: password }).toArray();
			if (results.length > 0) {
				id = results[0].UserId;
				fn = results[0].FirstName;
				ln = results[0].LastName;
			}
		}
		catch (e) {
			error = e.message()
		}
		var ret = { id: id, firstName: fn, lastName: ln, error: '' };
		res.status(200).json(ret);
	});

	app.post('/api/addRecipe', async (req, res, next) => {
		// incoming: recipeId, userId, recipeName, recipeFileName, ingredientList, tagList, likeList, dislikeList
		// outgoing: error

		var error = '';
		const { recipeId, userId, recipeName, recipeFileName, ingredientList,
			tagList, likeList, dislikeList } = req.body;
		const newRecipe = {
			RecipeId: recipeId, UserId: userId, RecipeName: recipeName,
			RecipeFileName: recipeFileName, IngredientList: ingredientList,
			TagList: tagList, LikeList: likeList, DislikeList: dislikeList
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