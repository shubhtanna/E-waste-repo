import mongoose, { mongo } from "mongoose";

const individualSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    contactNumber: {
        type: Number,
    },
});

export const Individual = mongoose.model("Individual",individualSchema)