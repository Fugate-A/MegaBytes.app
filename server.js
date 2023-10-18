const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url =
	'mongodb+srv://TheArchivist:R3c1p3Guard1an5K@cluster0.7i3llee.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

const port = 8443;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.post('/api/register', async (req, res, next) => {
    // incoming: userId, fname, lname, username, password, email
    // outgoing: error
    const { userId, fname, lname, username, password, email } = req.body;
    const newUser = { UserId: userId, FirstName: fname, LastName: lname, Username: username, Password: password, Email: email };
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
    const db = client.db('MegaBitesLibrary');
    const results = await
        db.collection('User').find({ Username: username, Password: password }).toArray();
    var id = -1;
    var fn = '';
    var ln = '';
    if (results.length > 0) {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }
    var ret = { id: id, firstName: fn, lastName: ln, error: '' };
    res.status(200).json(ret);
});

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
});


var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync("/etc/ssl/private/generated-private-key.key"),
    cert: fs.readFileSync("/etc/ssl/certs/2541c4c881b019c0.crt"),
    ca: [
    fs.readFileSync('/etc/ssl/certs/2541c4c881b019c0.crt'),
    fs.readFileSync('/etc/ssl/certs/gd_bundle-g2-g1.crt')
] };

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("Welcome to Node.js HTTPS Servern");
}).listen(8443)

console.log("Listening on port "+ port);
//app.listen(port); // start Node + Express server on port 5000