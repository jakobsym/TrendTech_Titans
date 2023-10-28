import express from 'express'
const dbRouter = express.Router();
import User from '../models/User.js'
import Cart from '../models/Cart.js'
import Product from '../models/Product.js';

/* 
TODO:
Administrative back end
- Allow to modify all items (CURRENT TASK)
    - delete items
    - create items
    - 
- Allow for creation of discount codes
- Allow for creation of sales items (DONE)
- Allow to modify users (DONE)

- Show currently placed orders
- Show history of orders
	- Sort by order date
	- Sort by customer
	- Sort by order size in dollar amount

*/
/* All routes are built upon 

    -> localhost:3000/viewdb 
    // get all users
    -> localhost:3000/viewdb/getusers
*/


/* Modifying Orders Request(s) */

/**
 * /createitem
 * - Creates an item which can be sold
 */
dbRouter.post('/createitem', async(req, res)=> {
    const newItem = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,      // price is of type Number (easier calculations)
        image: req.body.image,     // .png or .jpeg string
    });

    try {
        const newProduct = await newItem.save();
        console.log(`newProduct = ${JSON.stringify(newProduct)}`);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({message: "Error saving product to database."});
    }
});

/**
 * /deleteitem/id
 * - Delete an item based on the ID passed in url
 */
dbRouter.delete('/deleteitem/:itemId', getItem, async(req, res) => {
    try{
        await res.item.deleteOne();
        res.json({message: `${res.item.id} item deleted.`});

    } catch(error) {
        res.status(500).json({message: "ERROR: Unable to delete item from db."});
    }

});

/**
 * Get all current items for sale
 */
dbRouter.get('/getitems', async(req, res) => {
    try {
        const items = await Product.find();
        res.send(items);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error getting all items from database."});
    }
});

/**
 * /createsaleitem
 * - Creates a sale item
 */
dbRouter.post('/createsaleitem', async(req, res) => {
    // just set a discount on the item when creating it
    const saleItem = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,      // price is of type Number (easier calculations)
        image: req.body.image,     // .png or .jpeg string
        discount: req.body.discount,
    });

    console.log(`original price = ${saleItem.price}`);
    // Apply discount
    saleItem.price -= (saleItem.price * (saleItem.discount / 100));
    console.log(`discounted price = ${saleItem.price}`);

    try {
        const newSaleProduct = await saleItem.save();
        console.log(`newSaleProduct = ${JSON.stringify(newSaleProduct)}`);
        res.status(201).json(newSaleProduct);
    } catch (error) {
        res.status(400).json({message: "Error saving product to database."});
    }
});


// route for discount code
dbRouter.post('/discount', async(req, res) => {
    const discountCode = genDiscountCode();
    try {
    } catch (error) {
        return res.status().json({message: error.message});
    }
});


/**
 * Display all currently placed orders
 */
dbRouter.get('/orders', async(req, res) => {


});



/* User Functions */

// get all `Users` stored in the DB
dbRouter.get('/getusers', async(req,res) => {
    
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message});
    }
});


// Modify user (Email, Password, or Name) based on ID
// Using 'patch' instead of 'put' as we only want to update specific fields of the User
dbRouter.patch('/modifyuser/:userId', getUser, async(req, res)=> {
    // `res.user` to access getUser user passed in
    const updates = req.body.updates; // An array which holds objects

    //console.log(`req.body.updates = ${JSON.stringify(req.body.updates)}`);
    try {
        // ensure user exists
        if (!res.user) {
            res.status(400).json({message: "Error that UserID does not exist"});
        }

        //console.log(`req.body contents = ${JSON.stringify(req.body)}`);
        updates.forEach(object => {
            for(const key in object){
                // ensure `key` has a property(value)
                if (Object.hasOwnProperty.call(object, key)) {
                    const value = object[key]; // ex: "name" : "bob"; `value` = bob
                    if (key === 'name'){
                        res.user.name = value
                    } else if (key === 'email'){
                        res.user.email = value
                    } else if (key === 'password'){
                        res.user.password = value // TODO: Update securely (hashing)
                    } else {
                        res.status(400).json({message: "Invalid User Input"});
                        return; // exit loop for invalid input
                    }
                }
            }
        });
    
        const updatedUser = await res.user.save();
        console.log(`updatedUser = ${JSON.stringify(updatedUser)}`);
        res.json(updatedUser); // Send response back in JSON format
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error OW"});
    }
   
});


// delete a `User`based on ID
// Route example: localhost:3000/deleteuser/someUserID
dbRouter.delete('deleteuser/:userId', getUser, async(req, res) => {
    try{
        await res.user.deleteOne();
        res.json({message: `${res.user.id} user deleted.`});

    } catch(error) {
        res.status(500).json({message: error.message});
    }
});












// TODO: After working on login, implement this so admin button can populate if 
// specific route to get admin role for loading admin button on homescreen
dbRouter.get('/getadmin', async(req, res) => {
    try {
        const admin = await User.find({isAdmin: true}); // query for isAdmin: true ?
        res.send(admin.isAdmin); // true or false as return
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


/**
 * Gets a User by ID
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns a response of a `User` based on userID
 */
async function getUser(req, res, next) {
    let user;

    try {
        user = await User.findById(req.params.userId); 
        if (!user) {
            return res.status(404).json({message: 'No User of that ID'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.user = user; // use 'res.user' in all getUser methods to access the current user based on ID
    next();
};



/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns a response of a 'Item' based on itemID
 */
async function getItem(req, res, next) {
    let item;

    try {
        item = await Product.findById(req.params.itemId);

        if(!item){
            return res.status(404).json({message: "No item of that ID"});
        }
    } catch (error) {
        return res.status(500).json({message: "ItemID cannot be found in db."})
    }
    res.item = item;
    next();
}



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