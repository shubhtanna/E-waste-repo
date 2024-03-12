import mongoose from "mongoose"

const categorySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }]
})

export const Category = mongoose.model("Category", categorySchema);