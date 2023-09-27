import mongoose from 'mongoose'
import Cart from '../models/Cart.js'

// We can encrypt user information if we want? seems extra for project

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // https://www.mongodb.com/docs/manual/core/index-unique/
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6, // User Password len. >= 6
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },

});

/* Note: routes execute after middlewares */
// User & Admin specific middlewares


userSchema.post

/*
    - Email Validation for a User
    - 
**/

module.exports = mongoose.model('User', userSchema);