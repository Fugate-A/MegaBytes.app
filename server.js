const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const url =
    'mongodb+srv://TheArchivist:R3c1p3Guard1an5K@cluster0.7i3llee.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

var api = require('./api.js');
api.setApp(app, client);

const port = 8443;

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

/*
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to our website :)</h1>
        <p>Take a MEGA bite!!!</p>
      </header>
    </div>
  );
}

export default App;
*/

// var https = require('https');
// var fs = require('fs');
// var options = {
//     key: fs.readFileSync("/etc/ssl/private/generated-private-key.key"),
//     cert: fs.readFileSync("/etc/ssl/certs/2541c4c881b019c0.crt"),
//     ca: [
//     fs.readFileSync('/etc/ssl/certs/2541c4c881b019c0.crt'),
//     fs.readFileSync('/etc/ssl/certs/gd_bundle-g2-g1.crt')
// ] };

// https.createServer(options, app).listen(8443);

console.log("Listening on port 5000");
app.listen(5000); // start Node + Express server on port 5000