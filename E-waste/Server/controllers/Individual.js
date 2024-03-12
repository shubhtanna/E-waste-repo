import { User } from "../models/User.js";
import { Individual } from "../models/Individual.js";

export const updateIndividual = async(req,res) => {
    try {
        const id = req.user.id;

        const {
            contactNumber
        } = req.body;

        const userDetails = await User.findById(id);
        const individualId = userDetails.individualDetails;
        const individualDetails = await Individual.findById(individualId);

        individualDetails.contactNumber = contactNumber;

        await individualDetails.save();

        const updatedIndividual = await User.findById(id).populate("individualDetails").exec()

        return res.status(200).json({
            success:false,
            message:"Individual updated successfully",
            data:updatedIndividual,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in updaying the individual",
            error:error.message,
        })
    }
}

export const delteAccount = async(req,res) => {
    try {

        const id = req.user.id;

        const user = await User.findById({_id:id});

        if(!user) {
            return res.status(400).json({
                success:false,
                message:"user not found for deleting"
            });
        }

        await Individual.findByIdAndDelete({_id:user.individualDetails});

        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"User account delete succesfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in deleting account",
            error:error.message
        })
    }
}

export const getAllUserDetails = async(req,res) => {
    try{
        const userDetails = await User.find({accountType:"Individual"}).populate("individualDetails").exec();
        console.log(userDetails);

        return res.status(200).json({
            success:true,
            message:"User Data fetched Successfully",
            data:userDetails,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while geting all users details",
            error:error.message
        })
    }
}

export const getProductsPost = async(req,res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById({_id:id}).populate("products").exec();

        if(!userDetails) {
            return res.status(400).json({
                success:false,
                message:"user not found"
            });
        }

        return res.status(200).json({
            success:true,
            data:userDetails.products,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

