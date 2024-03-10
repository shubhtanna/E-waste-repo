import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    organizationName: {
        type: String,
        required: true,
    },
    organizationType: {
        type: String,
        enum: ["Private","Goverment"],
    },
})

export const Organization = mongoose.model("Organization",organizationSchema)