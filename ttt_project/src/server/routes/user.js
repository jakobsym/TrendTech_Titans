import express from 'express';
const router = express.Router();
const User = require('../models/User.js');

/*
    - Route that handles User registration.
    - Takes passed in request and assigns values( name, email, password )to User fields
 **/
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});




/*
    - Middleware that gets a User based on user ID
    - Can use this method in any route/middleware that requries a user ID
**/
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({message: 'User cannot be found.'});
        }

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.user = user;
    next();
}