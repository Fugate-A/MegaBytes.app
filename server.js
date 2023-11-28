const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = express();
require('dotenv').config();

const httpPort = 5000;
const httpsPort = 443;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const url =	process.env.MongoURL;
const client = new MongoClient(url);
client.connect();

// Import your API configuration
var api = require('./api.js'); // Adjust the path as needed
let ai = require('./ai_request.js');

// Set up the API routes
api.setApp(app, client); // Adjust the client as needed
ai.setApp(app, client);

app.use((req, res, next) => {
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

// Serve static files from your React app's "build" directory
app.use(express.static(path.join(__dirname, 'web_frontend', 'build')));


// Create an HTTPS server with SSL configuration
const httpsOptions = {
key: fs.readFileSync('/etc/ssl/private/generated-private-key.key'),
cert: fs.readFileSync('/etc/ssl/certs/2541c4c881b019c0.crt'),
ca: [
fs.readFileSync('/etc/ssl/certs/2541c4c881b019c0.crt'),
fs.readFileSync('/etc/ssl/certs/gd_bundle-g2-g1.crt'),
],
};

const httpsServer = https.createServer(httpsOptions, app);


// Serve the React application for both root URL and "/megabytes.app"
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'web_frontend', 'build', 'index.html'));
});


// Start the HTTPS server on port 443
httpsServer.listen(httpsPort, () => {
console.log(`HTTPS Server is running on port ${httpsPort}`);
});

//comment to force push 

// Start the HTTP server on port 5000
app.listen(httpPort, () => {
	console.log(`HTTP Server is running on port ${httpPort}`);
});