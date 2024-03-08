import mongoose from "mongoose";

const RewardSchema = new mongoose.Schema({
    reward: [
        {
            type: Number,
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

export const Reward = mongoose.model("Reward",RewardSchema)