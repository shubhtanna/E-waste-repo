import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    contactNumber : {
        type: Number,
    },
    gstNumber: {
        type: String,
    },
    gstInvoice: {
        type: String,
    },
    shopName: {
        type: String,
    },
    
})

export const Vendor = mongoose.model("Vendor",vendorSchema)