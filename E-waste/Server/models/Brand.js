import mongoose from "mongoose"

const BrandSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
})

export const brand = mongoose.model("Brand", BrandSchema);