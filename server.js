const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const httpPort = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const url = process.env.MongoURL;
const client = new MongoClient(url);

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    const api = require('./api'); // Import the API functionality

    // Set up the API routes
    api.setApp(app, client); // Connect API functionality to your server

    // Serve static files or other configurations
    app.use(express.static(path.join(__dirname, 'web_frontend', 'build')));

    // Start the HTTP server on port 5000
    app.listen(httpPort, () => {
      console.log(`HTTP Server is running on port ${httpPort}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });