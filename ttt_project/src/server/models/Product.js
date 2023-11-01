import mongoose from "mongoose";

const productSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    inventory: {
        type: Number,
        required: true,
        default: 1,
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

// Product specific middlewares

export default mongoose.model('Product', productSchema);