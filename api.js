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
			const result = db.collection('User').insertOne(newUser);
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

	/*
	app.post('/api/search', async (req, res, next) => {
		// incoming: userId, search
		// outgoing: results[], error
		var error = '';
		const { userId, search } = req.body;
		var _search = search.trim();
		const db = client.db('COP4331Cards');
		const results = await
			db.collection('Cards').find({
				"Card": {
					$regex: _search + '.*',
					$options: 'r'
				}
			}).toArray();
		var _ret = [];
		for (var i = 0; i < results.length; i++) {
			_ret.push(results[i].Card);
		}
		var ret = { results: _ret, error: error };
		res.status(200).json(ret);
	});*/
}