const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let transporter;

exports.setApp = function (app, client) {
  app.post('/api/register', async (req, res, next) => {
    const { username, password, email } = req.body;
    const newUser = { UserID: Date.now(), Username: username, Password: password, Email: email };
    let error = '';
    try {
      const db = client.db('MegaBitesLibrary');
      db.collection('User').insertOne(newUser);
    } catch (e) {
      error = e.toString();
    }
    const ret = { error: error };
    res.status(200).json(ret);
  });

  app.post('/api/login', async (req, res, next) => {
    let error = '';
    const { username, password } = req.body;
    const isEmail = username.includes("@");
    try {
      const db = client.db('MegaBitesLibrary');
      const results = await (isEmail
        ? db.collection('User').find({ Email: username, Password: password }).toArray()
        : db.collection('User').find({ Username: username, Password: password }).toArray());
      
      let id = -1;
      if (results.length > 0) {
        id = results[0]._id;
      }
    } catch (e) {
      error = e.message();
    }
    const ret = { id: id, error: error };
    res.status(200).json(ret);
  });

  app.post('/api/addRecipe', async (req, res, next) => {
    let error = '';
    const { userId, recipeName, recipeContents, tagList, likeList } = req.body;
    const newRecipe = {
      UserId: userId, RecipeName: recipeName, recipeContents: recipeContents,
      TagList: tagList, LikeList: likeList
    };

    try {
      const db = client.db('MegaBitesLibrary');
      db.collection('Recipes').insertOne(newRecipe);
    } catch (e) {
      error = e.toString();
    }

    const ret = { error: error };
    res.status(200).json(ret);
  });

  app.post('/api/deleteRecipe', async (req, res, next) => {
    let error = '';
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

    const ret = { error: error };
    res.status(200).json(ret);
  });

  app.post('/api/getRecipes', async (req, res, next) => {
    let error = '';
    const { search } = req.body;
    const _search = search.trim();
    const db = client.db('MegaBitesLibrary');
    const results = await db.collection('Recipes').find({
      "RecipeName": {
        $regex: _search + '.*',
        $options: 'i'
      }
    }).toArray();

    const ret = { results: results, error: error };
    res.status(200).json(ret);
  });

  app.post('/api/addComment', async (req, res, next) => {
    let error = '';
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

    const ret = { error: error };
    res.status(200).json(ret);
  });

  app.post('/api/deleteComment', async (req, res, next) => {
    let error = '';
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

    const ret = { error: error };
    res.status(200).json(ret);
  });

  transporter = nodemailer.createTransport({
    host: 'smtp.forwardemail.net',
    port: 587,
    secure: false,
    auth: {
      user: process.env.VerificationEmail,
      pass: process.env.VerificationEmailPassword
    },
    from: process.env.VerificationEmail
  });

  app.post('/api/verifyEmail', (req, res) => {
    const { to, subject, text } = req.body;

    const token = jwt.sign({ email: to }, process.env.KeyTheJWT, { expiresIn: '1h' });

    const verificationLink = `https://megabytes.app/verify?token=${token}`;

    const mailOptions = {
      from: process.env.VerificationEmail,
      to,
      subject,
      text: `${text}\n\nVerification Link: ${verificationLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  });

  app.get('/verify', (req, res) => {
    const token = req.query.token;
  
    jwt.verify(token, process.env.KeyTheJWT, (err, decoded) => {
      if (err) {
        console.error('Error verifying token:', err);
        res.status(400).send('Invalid token');
      } else {
        // Log the token to the console
        console.log('Verified token:', decoded);
  
        // You can also send a response to the client if needed
        res.status(200).send(`Verification successful. Token: ${token}`);
      }
    });
  });
};
