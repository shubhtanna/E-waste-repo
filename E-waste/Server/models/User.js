import mongoose from "mongoose";

const schema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        required: true,
        type: String,
      },
      accountType: {
        required: true,
        type: String,
        enum: ["Individual", "Vendor","Organization","Admin"],
      },
      address: {
        required: true,
        type: String,
      },
      city:{
        required: true,
        type: String,
      },
      pincode: {
        required: true,
        type: Number,
      },
      image: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      resetpasswordexpires: {
        type: Date,
      },
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        }
      ],
      individualDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Individual",
      },
      vendorDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
      organizationDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
      Location: {
        type: String,
      },
      token: {
        type: String
      }
});

export const User = mongoose.model("User", schema);