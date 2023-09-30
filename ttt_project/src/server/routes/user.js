import express from 'express';
const userRouter = express.Router();
import User from '../models/User.js'
import Cart from '../models/Cart.js'


// Works as intended.
userRouter.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message});
    }
});


/*
    - Route that handles User registration.
    - Takes passed in request and assigns values( name, email, password )to User fields
    - Each user should get a `cart` associated with their account upon registration
 **/
userRouter.post('/', async (req, res) => {

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,     
    });
    const cart = new Cart();
    /*
    console.log(user.name);
    console.log(user.email);
    console.log(user.password);
    console.log(cart);
    */
    try {                    
        const newUser = await user.save();
        //const userCart = await cart.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

// Method works as intended
userRouter.delete('/:id', getUser, async(req, res) => {
    try{
        await res.user.deleteOne();
        res.json({message: "user deleted."});

    } catch(error) {
        res.status(500).json({message: error.message});
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

export default userRouter;