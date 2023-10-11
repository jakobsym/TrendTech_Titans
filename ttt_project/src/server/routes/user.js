import express from 'express';
const userRouter = express.Router();
import User from '../models/User.js'
import Cart from '../models/Cart.js'

/** 
    - Route that handles User registration.
    - Takes passed in request and assigns values( name, email, password )to User fields
    - Each user gets a `cart` associated with their account upon registration
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
    /*
    console.log(user.name);
    console.log(user.email);
    console.log(user.password);
    */

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


/**
 * - Handle all User `login` request(s)
 */
userRouter.post('/login', async (req, res) => {
    try {
        const user  = await User.findByCredentials(req.body.email, req.body.password); 
        const token = await user.genAuthToken();                                      // TODO: install genAuth() 
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
        console.log("Error logging user in.");
    }
});


export default userRouter;