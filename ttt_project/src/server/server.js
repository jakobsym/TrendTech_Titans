/* How to run backend server(depends on current path): -> node server.js */
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/user.js'

// TODO: Fix this .env file --> console.log(process.env.DATABASE_URL);

const app = express();
mongoose.connect('mongodb://0.0.0.0:27017/ecommerceDB'); // connect to our database
const db = mongoose.connection;

// handle any errors when connecting to DB
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB.'));

app.use(express.json()); //JSON as that is what all GET/POST request(s) will be
app.use('/register', userRouter)


// Handle static assets (html, css, images)


// listen for connection
app.listen(3000, () => console.log('Backend server running at http://localhost:3000'))
