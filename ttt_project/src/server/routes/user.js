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