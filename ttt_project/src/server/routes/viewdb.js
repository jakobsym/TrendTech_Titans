import express from 'express'
const adminRouter = express.Router();
import User from '../models/User.js'
import DiscountCode from '../models/DiscountCode.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

//TODO: Change all routes to work with admin dashboard frontend

/**
 * /createitem
 * - Creates an item which can be sold
 */
adminRouter.post('/createitem', async(req, res)=> {
    const newItem = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,      // price is of type Number (easier calculations)
        image: req.body.image,     // .png or .jpeg string
        inventory: req.body.inventory
    });

    try {
        const newProduct = await newItem.save();
        console.log(`newProduct = ${JSON.stringify(newProduct)}`);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({message: "ERROR: Cannot save product to database."});
    }
});

/**
 * /deleteitem/id
 * - Delete an item based on the ID passed in url
 */
adminRouter.delete('/deleteitem', async(req, res) => {
    const itemName = req.query.name;
    try{
        const foundItem = await Product.deleteOne({name: itemName});
        //res.json({message: `${JSON.stringify(foundItem)} item deleted.`});
        res.send(JSON.stringify(foundItem));    
    } catch(error) {
        res.status(500).json({message: "ERROR: Unable to delete item from db."});
    }
}); 

/** 
 * Increment or Decrement inventory of an Item 
*/
adminRouter.patch('/updateiteminv', async(req, res) => {
    const item = req.query.name;
    
    try {
        const foundItem = await Product.findOne({name: item});

        if (!foundItem) {
            res.status(400).json({message: `ERROR: ${foundItem.name} is not a current product.`});
        }

        if (req.body.inventory){
            console.log(`inventory before = ${foundItem.inventory}`);
            foundItem.inventory += req.body.inventory;
            console.log(`inventory after = ${foundItem.inventory}`);
        }

        const updatedItem = await foundItem.save();
        console.log(`updatedItem = ${JSON.stringify(updatedItem)}`);
        res.send(updatedItem); // Send response back in JSON format

    } catch (error) {
        res.status(500).json({message: "ERROR: Cannot save changes to DB."});
    }
});

/**
 * Change Item Description
 */
adminRouter.patch('/updateitemdesc', async(req, res) => {
    const itemName = req.query.name;

    try {
        const foundItem = await Product.findOne({name: itemName});

        if (!foundItem) {
            return res.json(400).message({message: "ERROR: Item of that name does not exist."});
        }
        console.log(`descriptionB = ${foundItem.description}`);

        if (req.body.description){
            foundItem.description = req.body.description;
        }

        console.log(`descriptionA = ${foundItem.description}`);
        const updatedItem = await foundItem.save();
        console.log(`updatedItem = ${JSON.stringify(updatedItem)}`);
        res.send(updatedItem); // Send response back in JSON format
        
    } catch (error) {
        return res.json(500).message({message: "ERROR: Cannot save changes to DB."})
    }
});

/**
 * Change Item Price based on item name
 */
adminRouter.patch('/updateitemprice', async(req, res) => {
    const itemName = req.query.name;
    console.log(`itemName = ${itemName}`);
    try {
        const foundItem = await Product.findOne({name: itemName}).exec();

        if (!foundItem) {
            return res.json(400).message({message: "ERROR: Item of that ID does not exist."});
        }
        console.log(`contents of foundItem = ${foundItem}`);
        console.log(`priceB = ${foundItem.price}`);
        if (req.body.price){
            foundItem.price = req.body.price;
        }
        console.log(`priceA = ${foundItem.price}`);

        const updatedItem = await foundItem.save();
        console.log(`updatedItem = ${JSON.stringify(updatedItem)}`);
        res.send(updatedItem);
        
    } catch (error) { 
        res.status(500).json({message: "ERROR: Cannot save changes to DB."})
    }

});

/**
 * Get all current items
 * - Displays all Product(s)
 */
adminRouter.get('/getitems', async(req, res) => {
    try {
        const items = await Product.find(); 
        res.send(items);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "ERROR: Cannot get all items from database."});
    }
});

/**
 * /createsaleitem
 * - Creates a sale item
 */
adminRouter.post('/createsaleitem', async(req, res) => {
    // just set a discount on the item when creating it
    const saleItem = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,      // price is of type Number (easier calculations)
        image: req.body.image,     // .png or .jpeg string
        inventory: req.body.inventory,
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
        res.status(400).json({message: "ERROR: Unable to save product to database."});
    }
});

/**
 * Display all currently placed orders
 */
adminRouter.get('/getorders', async(req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch (error) {
        res.status(500).json.message({message: "ERROR: Cannot get all Orders."});
    }
});

/**
 * Get all current orders via price (high -> low)
 */
adminRouter.get('/getorders/byprice/high-low', async(req, res) => {
    try {
        const orders = await Order.find().sort({orderTotal: -1});
        res.send(orders);
    } catch (error) {
        res.status(500).json.message({message: "ERROR: Cannot get all Orders."});
    }
});

/**
 * Get all current orders via price (low -> high)
 */
adminRouter.get('/getorders/byprice/low-high', async(req, res) => {
    try {
        const orders = await Order.find().sort({orderTotal: 1});
        res.send(orders);
    } catch (error) {
        res.status(500).json.message({message: "ERROR: Cannot get all Orders."});
    }
});

/**
 * Get all orders via date (new -> old)
 */
adminRouter.get('/getorders/bydate/new-old' , async(req, res) => {
    try {
        const orders = await Order.find().sort({orderDate: -1});
        res.send(orders);
    } catch (error) {
        res.status(500).json.message({message: "ERROR: Cannot get all Orders."});
    }
});

/**
 * Get all orders via date (old -> new)
 */
adminRouter.get('/getorders/bydate/old-new', async(req, res) => {
    try {
        const orders = await Order.find().sort({orderDate: 1});
        res.send(orders);
    } catch (error) {
        res.status(500).json.message({message: "ERROR: Cannot get all Orders."});
    }
});

/**
 * Get all orders for a Customer via their name
 * - Enter a customer name, and get all of their orders
 */
adminRouter.get('/getorders/bycustomer', async(req, res) => {
    const userName = req.query.name;
    //console.log(`userName = ${userName}`);
    try {
        const foundUser = await User.find({name: userName}).exec();
        //console.log(`user found = ${JSON.stringify(user)}`);
        const orders = await Order.find({user: foundUser}).exec(); 
        res.send(orders);
    } catch (error) {
        res.status(500).json({messsage: `ERROR: Cannot get ${userName} from db.`});
    }
}); 

/**
 * - Allow for creation of discount codes
 * - Discount is applied as a (% off)
 */
adminRouter.post('/creatediscount', async(req, res) => {

    const newDiscountCode = new DiscountCode({
        code: genDiscountCode(),
        value: req.body.value,
    });

    try {
        const createdCode = await newDiscountCode.save();
        console.log(`newDiscount = ${JSON.stringify(createdCode)}`);
        res.status(201).json(createdCode);
    } catch(error) {
        res.status(400).json({message: "ERROR: Cannot save discount code to database."});
    }
});

/* User related Functions */

// get all `Users` stored in the DB
adminRouter.get('/getusers', async(req,res) => {
    
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "ERROR: Cannot get all Users."});
    }
});


// Modify user (Email, Password, or Name) based on ID
// Using 'patch' instead of 'put' as we only want to update specific fields of the User
adminRouter.patch('/modifyuser',async(req, res)=> {
    const userName = req.query.name;
    console.log(`user = ${userName}`);
    const updates = req.body.updates; // An array which holds objects
    //console.log(`req.body.updates = ${JSON.stringify(req.body.updates)}`);

    try {
        const foundUser = await User.findOne({name: userName});

        // ensure user !exists
        if (!foundUser) {
            res.status(400).json({message: `ERROR: User of that name does not exist`});
        }

        //console.log(`req.body contents = ${JSON.stringify(req.body)}`);
        updates.forEach(object => {
            for(const key in object){
                // ensure `key` has a property(value)
                if (Object.hasOwnProperty.call(object, key)) {
                    const value = object[key]; // ex: "name" : "bob"; `value` = bob
                    if (key === 'name'){
                        foundUser.name = value
                    } else if (key === 'email'){
                        foundUser.email = value
                    } else if (key === 'password'){
                        foundUser.password = value // TODO: Update securely (hashing)
                    } else {
                        res.status(400).json({message: "ERROR: Invalid User Input"});
                        return; // exit loop for invalid input
                    }
                }
            }
        });
        const updatedUser = await foundUser.save();
        console.log(`updatedUser = ${JSON.stringify(updatedUser)}`);
        res.send(updatedUser); // Send response back in JSON format

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "ERROR: Server Error OW"});
    }
});


adminRouter.delete('/deleteuser', async(req, res) => {
    const userName = req.query.name;
    try{
        const foundUser = await User.deleteOne({name: userName});
        res.send({message: `${JSON.stringify(foundUser.name)} user deleted.`});
    } catch(error) {
        res.status(500).json({message: "ERROR: Cannot delete User."});
    }
});


// TODO: Cant do anything with this until MainPage is on GH (dont really know how login is implemented)
adminRouter.get('/getadmin', async(req, res) => {
    try {
        const admin = await User.find({isAdmin: true}); // query for isAdmin: true ?
        res.send(admin.isAdmin); // true or false as return
    }catch(error){
        res.status(500).json({message: "ERROR: Cannot access Admin"});
    }
});


/**
 * Randomized discount codes generated
 * @returns {String} a randomized value which represents the discount code
 */
function genDiscountCode() {
    const chars = 'ICLOTHES!?4';
    const charsLen = chars.length - 6;
    let discountCode = '';

    for(let i = 0; i < chars.length; i++) {
        discountCode += chars.charAt(Math.floor(Math.random() * charsLen));
    }
    return discountCode
}



export default adminRouter;