import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catagory",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productImage: {
        required: true,
        type: String,
    },
    brandName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
    invoiceImage: {
        type: String,
    },
    modelName: {
        type: String,
    },
})

export const product = mongoose.model("Product", productSchema);