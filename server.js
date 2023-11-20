const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const https = require('https');
const https = require('http');
const fs = require('fs');
const path = require('path');
const app = express();
require('dotenv').config();

const httpPort = 5000;
//const httpsPort = 443;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const url =	process.env.MongoURL;
const client = new MongoClient(url);
client.connect();

// Import your API configuration
var api = require('./api.js'); // Adjust the path as needed

// Set up the API routes
api.setApp(app, client); // Adjust the client as needed

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



// Serve the React application for both root URL and "/megabytes.app"
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'web_frontend', 'build', 'index.html'));
});



// Start the HTTP server on port 5000
app.listen(httpPort, () => {
	console.log(`HTTP Server is running on port ${httpPort}`);
});