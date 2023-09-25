import mongoose from "mongoose";
// Import User.js ????

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requried: true,
    },
    // Array of Product(s) called `items` to represent our Cart
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                requried: true,
                default: 1,
            },
        },
    ],
    cartTotal: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});