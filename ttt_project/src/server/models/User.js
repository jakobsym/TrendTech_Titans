import mongoose from 'mongoose'
// We can encrypt user information if we want? seems extra for project

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {

    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    // TODO: Create a Cart.js model to represnt a cart
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },

});