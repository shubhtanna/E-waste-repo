import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    contactNumber : {
        type: Number,
    },
    gstNumber: {
        type: String,
        required:true,
    },
    gstInvoice: {
        type: String,
        required:true
    },
    shopName: {
        type: String,
    },
    
})

export const Vendor = mongoose.model("Vendor",vendorSchema)