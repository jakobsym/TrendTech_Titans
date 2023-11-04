/* How to run backend server(depends on current path): -> node server.js */
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import userRouter from './routes/user.js'
import dbRouter from './routes/viewdb.js'

const registrationFile = 'file:/Users/jakobsymchych/Documents/3773projectnotes/eCommerceProject/TrendTech_Titans/ttt_project/src'
const __filename = fileURLToPath(registrationFile);
const __dirname = path.dirname(__filename); // __dirname puts us at root of project

const app = express();
mongoose.connect('mongodb://0.0.0.0:27017/ecommerceDB'); // connect to our database
const db = mongoose.connection;

// allow us to sync frontend server with backend server
const corsOptions = {
    origin: 'http://localhost:5173/',
    optionsSuccesStatus: 200,  
};

// handle any errors when connecting to DB
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB.'));

app.use(cors(corsOptions));
// Handle static assets (html, css, images)
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, 'src', 'client', 'pages', 'Admin')));

// loads registeration.html when `/register`route accessed
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/client/pages/Registration', 'registration.html'));
});

// loads login.html when `/login`route accessed
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/client/pages/Login', 'login.html'))
});


app.use(express.json());               //JSON as that is what all GET/POST request(s) will be
app.use('/login', userRouter);        // TODO: Not sure if this works out?   
app.use('/register', userRouter);    // route for registering a new user
app.use('/viewdb', dbRouter);       // temp name, will act as admin route


// listen for connection
app.listen(3000, () => console.log('Backend server running at http://localhost:3000'))
