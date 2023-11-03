import mongoose from "mongoose";

const discountCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
});

export default mongoose.model('DiscountCode', discountCodeSchema);  