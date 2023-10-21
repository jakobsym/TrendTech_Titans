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


/**
 * User `login` request(s)
 */
userRouter.post('/login', async (req, res) => {
    try {
        const user  = await User.findByCredentials(req.body.email, req.body.password); 
        const token = await user.genAuthToken();                                   
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
        console.log("Error logging user in.");
    }
});

/**
 * User logout request(s)
 */
userRouter.post('/logout', async(req, res) => {
    try {
    } catch (error) {
        res.status(400).send(message.error);
        console.log("Error logging out.");
        
    }
})




export default userRouter;