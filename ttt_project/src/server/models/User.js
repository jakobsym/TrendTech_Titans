import mongoose from 'mongoose'
import Cart from '../models/Cart.js'

// We can encrypt user information if we want? seems extra for project
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
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

/*
    - Email Validation for a User
    - 
**/

export default mongoose.model('User', userSchema);