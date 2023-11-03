import express from "express";
const utilRouter = express.Router();
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js'
import DiscountCode from "../models/DiscountCode.js";

const SALES_TAX = Math.round(8.25*100)/100;

// Create new orders, to test filtering
utilRouter.post('/createorder', async(req, res) => {

    const user = req.body.user;
    const products = req.body.products;
    const orderStatus = req.body.orderStatus;
    let orderSum = 0;
    
    //console.log(`user = ${user}`);
    //console.log(`products = ${JSON.stringify(products)}`);
    //console.log(`orderStatus = ${orderStatus}`);

    // get all products from products array
    for (const key in products) {
        const curItem = await Product.findById(products[key].product);
        orderSum += curItem.price;
        //console.log(`curItem.price = ${curItem.price}`); 
    }

    orderSum += (orderSum * (SALES_TAX / 100));
    const orderSumFixed = Math.round(orderSum*100)/100; // I.E: 45.9999324 -> 45.99 (type Number) 
    //console.log(`orderSumFixed = ${orderSumFixed}`);

    const newOrder = new Order({
        user: user,
        products: products,
        orderStatus: orderStatus,
        orderTotal: orderSumFixed,
    });
    
    try {
        const order = await newOrder.save();
        //console.log(`order = ${JSON.stringify(order)}`);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'ERROR: Cannot create the order'});
    }
});

utilRouter.get('/getdiscounts', async(req, res) => {
    try {
        const discounts = await DiscountCode.find();
        res.send(discounts);
    } catch (error) {
        res.status(500).json.message({message: "ERROR: Cannot get discount codes from DB."});
    }
});

// delete a `User`based on ID
// Route example: localhost:3000/deleteuser/someUserID
utilRouter.delete('/deleteuser/:userId', getUser, async(req, res) => {
    try{
        await res.user.deleteOne();
        res.json({message: `${res.user.id} user deleted.`});
    } catch(error) {
        res.status(500).json({message: "ERROR: Cannot delete User."});
    }
});


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
            return res.status(404).json({message: "ERROR: No item of that ID"});
        }
    } catch (error) {
        return res.status(500).json({message: "ERROR: ItemID cannot be found in db."})
    }
    res.item = item;
    next();
}

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



export default utilRouter