require('express');
require('mongodb');

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
		let error = '';
		const { username, password } = req.body;
		const isEmail = username.includes("@");
		try {
			const db = client.db('MegaBitesLibrary');
			const results = await (isEmail
				? db.collection('User').find({ Email: username, Password: password }).toArray()
				: db.collection('User').find({ Username: username, Password: password }).toArray());
			
			var id = -1;
			if (results.length > 0) {
				id = results[0]._id;
			}
		}
		catch (e) {
			error = e.message()
		}
		let ret = { id: id, error: error };
		res.status(200).json(ret);
	});

	app.post('/api/addRecipe', async (req, res, next) => {
		// incoming: userId, recipeName, recipeContents, tagList, likeList
		// outgoing: error

		var error = '';
		const { userId, recipeName, recipeContents,
			tagList, likeList } = req.body;
		const newRecipe = {
			UserId: userId, RecipeName: recipeName,
			recipeContents: recipeContents,
			TagList: tagList, LikeList: likeList
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