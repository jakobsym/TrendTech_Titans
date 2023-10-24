import express from 'express';
import User from '../models/User.js'
import Cart from '../models/Cart.js'
//import Auth from '../../middleware/auth.js'
const userRouter = express.Router();

/** 
    User registration route
 */
userRouter.post('/', async (req, res) => {
    
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    if (user.name === 'admin') {
        user.isAdmin = true;
    }

    const newCart = new Cart();  
    user.cart = newCart;

    try {                
        const newUser = await user.save();
        
        console.log(newUser);
        //const userCart = await cart.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});



export default userRouter;