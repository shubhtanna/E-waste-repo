import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
    price:{
        type:Number,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    }
})

export const price = mongoose.model("Price", priceSchema);