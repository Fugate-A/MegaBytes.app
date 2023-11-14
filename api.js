require('express');
require('mongodb');

const { ObjectId } = require('mongodb');
const fs = require('fs').promises;

exports.setApp = function (app, client) {
	app.post('/api/register', async (req, res, next) => {
		// incoming:  username, password, email
		// outgoing: error
		const { username, password, email } = req.body;
		const newUser = { Username: username, Password: password, Email: email };
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
				{ $push: { RecipeList: { _id: recipeId } } }
			);

			console.log(updateResult);

			res.status(200).json({ error: null });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});

	app.post('/api/updateRecipeLikes', async (req, res, next) => {
		// incoming: userID, recipeID
		// outputs: update value, error

		const { userID, recipeID } = req.body;

		try {
			const db = client.db('MegaBitesLibrary');
			const recipe = await db.collection('Recipes').findOne( {_id: new ObjectId(recipeID)} );
			let update = 0;

			if(!recipe){
				return res.status(404).json( {error: 'Reicpe not found'} );
			}

			if( !(recipe.LikeList.includes(userID)) ){
				await db.collection('Recipes').updateOne(
					{ _id: new ObjectId(recipeID) },
					{ $push: {LikeList: userID}}
				);
				update = 1;
			}else{
				await db.collection('Recipes').updateOne(
					{ _id: new ObjectId(recipeID) },
					{ $pull: { LikeList: userID }}
				);
				update = -1;
			}
			res.status(200).json({ update: update, error: null});
		} catch(error){
			console.error('Error updating likes', error);
			res.status(500).json({ error: 'Internal Server Error'} );
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

	app.post('/api/getUserRecipes', async (req, res, netx) => {
		// incoming: userID
		// outgoing: results[], error

		try {
			const { userID } = req.body;

			if (!userID) {
				return res.status(400).json({ error: 'userID is required' });
			}

			const db = client.db('MegaBitesLibrary');

			const user = await db.collection('User').findOne({ _id: new ObjectId(userID) });

			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}

			const recipeList = user.RecipeList || [];

			const recipeIds = recipeList.map(recipe => recipe._id);

			res.json({ results: recipeIds, error: '' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal error' });
		}
	});

	app.post('/api/getRecipeByID', async (req, res, next) => {
		// incoming recipeID
		// outgoing: recipe, error

		try {
			const { recipeID } = req.body;

			if (!recipeID) {
				return res.status(400).json({ error: 'recipeID is required' });
			}

			const db = client.db('MegaBitesLibrary');

			const recipe = await db.collection('Recipes').findOne({ _id: new ObjectId(recipeID) });

			if (!recipe) {
				return res.status(404).json({ error: 'Recipe not found' });
			}

			res.json({ results: recipe, error: '' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal error' });
		}

	});

	app.post('/api/getUser', async (req, res, next) => {
		// incoming userId
		// outgoing: recipe, error

		try {
			const { userId } = req.body;

			if (!userId) {
				return res.status(400).json({ error: 'userId is required' });
			}

			const db = client.db('MegaBitesLibrary');

			const user = await db.collection('User').findOne({ _id: new ObjectId(userId) });

			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}

			res.json({ results: user, error: '' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal error' });
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

		const { recipeId, userId, commentText } = req.body;
		const newComment = {
			RecipeId: new ObjectId(recipeId),
			UserId: new ObjectId(userId),
			CommentText: commentText
		};

		try {
			const db = client.db('MegaBitesLibrary');

			const insertResult = db.collection('Comments').insertOne(newComment);

			const commentId = insertResult.insertedId;

			// Update the user's RecipeList with the new recipe
			const updateResult = await db.collection('Recipes').updateOne(
				{ _id: new ObjectId(recipeId) },
				{ $push: { CommentList: { _id: commentId } } }
			);

			console.log(updateResult);

			res.status(200).json({ error: null });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});

	app.post('/api/updateCommentLikes', async (req, res, next) => {
		// incoming: userID, commentID

		const { userID, commentID } = req.body;

		try {
			const db = client.db('MegaBitesLibrary');
			const comment = await db.collection('Comments').findOne( {_id: new ObjectId(commentID)} );
			let update = 0;

			if(!comment){
				return res.status(404).json( {error: 'Comment not found'} );
			}

			if( !(comment.LikeList.includes(userID)) ){
				await db.collection('Comments').updateOne(
					{ _id: new ObjectId(commentID) },
					{ $push: {LikeList: userID}}
				);
				update = 1;
			}else{
				await db.collection('Comments').updateOne(
					{ _id: new ObjectId(commentID) },
					{ $pull: { LikeList: userID }}
				);
				update = -1;
			}
			res.status(200).json({ update: update, error: null});
		} catch(error){
			console.error('Error updating likes', error);
			res.status(500).json({ error: 'Internal Server Error'} );
		}
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

	app.post('/api/editRecipe', async (req, res, next) => {
		// incoming: recipeID, recipeName, recipeContents, tagList, likeList
		// outgoing: error

		var error = '';
		const { recipeId, recipeName, recipeContents, tagList, likeList } = req.body;
		const updateInfo = { RecipeName: recipeName, RecipeContents: recipeContents, TagList: tagList, LikeList: likeList }
		const db = client.db('MegaBitesLibrary');
		try {
			const result = await db.collection('Recipes').updateOne(
				{ _id: new ObjectId(recipeId) },
				{ $set: updateInfo }
			);
			res.json({ message: `${result.nModified} document(s) updated` });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}

		var ret = { error: error };
		res.status(200).json(ret);
	});

	app.post('/api/editComment', async (req, res, next) => {
		// incoming: commentID, commentText
		// outgoing: error

		var error = '';
		const { commentId, commentText } = req.body;
		const updateInfo = { CommentText: commentText }
		const db = client.db('MegaBitesLibrary');
		try {
			const result = await db.collection('Comments').updateOne(
				{ _id: new ObjectId(commentId) },
				{ $set: updateInfo }
			);
			res.json({ message: `${result.nModified} document(s) updated` });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}

		var ret = { error: error };
		res.status(200).json(ret);
	});

	const getTags = async () => {
		try {
			const data = await fs.readFile('./tags.json', 'utf8');
			return JSON.parse(data);
		} catch(error) {
			console.error('Error reading tags from file', error);
			return [];
		}
	};

	app.get('/api/tags', async(req, res) => {
		const tags = await getTags();
		res.json(tags);
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