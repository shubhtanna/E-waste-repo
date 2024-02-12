import mongoose from "mongoose";

const individualSchema = new mongoose.Schema({
    contactNumber: {
        type: Number,
    },
});

export const Individual = mongoose.model("Individual",individualSchema)