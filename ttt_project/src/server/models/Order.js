import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    orderDate: {
        type: Date,
        default: Date.now(),
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    orderTotal: {
        type: Number,
        required: true,
        default: 0
    },
    discountCode: {
        type: String,
    },
    discountAmount: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('Order', orderSchema);