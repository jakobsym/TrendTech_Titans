import express from 'express'
const dbRouter = express.Router();
import User from '../models/User.js'
import Cart from '../models/Cart.js'

// Print all `Users`stored in the DB
dbRouter.get('/', async(req,res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message});
    }
});

// delete a `User`based on ID
dbRouter.delete('/:id', getUser, async(req, res) => {
    try{
        await res.user.deleteOne();
        res.json({message: `${res.user.id} user deleted.`});

    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

s
// route for discount code
dbRouter.post('/discount', async(req, res) => {
    const discountCode = genDiscountCode();

    try {

        
    } catch (error) {
        return res.status().json({message: error.message});
    }
});

/**
 * Gets a User by ID
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns a response of a `User` based on their ID
 */
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
};

/**
 * Allow for creation of discount codes 
 * Admin clicks a button, and it generates a randomized code that is sent to the screen
 */


/**
 * Randomized discount codes generated
 * @returns {String} a randomized value which represents the discount code
 */
function genDiscountCode() {
    const chars = 'TRENDTECHTITANS!$?4';
    const charsLen = chars.length;
    let discountCode = '';
    

    for(i = 0; i < chars.length; i++) {
        discountCode += chars.charAt(Math.floor(Math.random() * charsLen));
    }
    return discountCode
}


export default dbRouter;