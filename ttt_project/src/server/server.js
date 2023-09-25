/* How to run backend server: node server.js */
import 'dotenv/config'

console.log(process.env.DATABASE_URL);

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL); // connect to our database
const db = mongoose.connection;

// handle any errors when connecting to DB
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB.'));

// Middleware setup here
app.use(express.json()); //JSON as that is what all GET/POST request(s) will be

// Handle `routes` here


// Handle static assets (html, css, images)


// listen for connection
app.listen(3000, () => console.log('Backend server running at localhost:3000'))
