import { syncIndexes } from 'mongoose';
import {User} from '../models/User.js';

export const getShopByCity =  async(req,res)=>{
    try{

        const {city,shopId} =  req.user;
        console.log(city,shopId);

        //Not required according to me
        // if(!city || !shopId){
        //     return respond(res,404,"All fields are required");
        // }
        
        const shop = await User.find({city:city});

        return respond(res,200,"All the Shops fetched by city",shop);

    }catch(error){
        console.log("Error in fetching shop by city : ",error);
        return respond(res,500,"All the Shops are not fetched by city");
    }
}

exports.updateVendor = async(req,res) => {
    try{

        const id = req.user.id;

        const {
            name = "",
            contactNumber,
            gstNumber = "",
            shopName
        } = req.body

        const gstInvoice = req.files.gstInvoice;

        if(!name || !gstInvoice || !gstInvoice ){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }

        const userDetails = await User.findById(id);
        const vendorId = userDetails.vendorDetails;
        const vendorDetails = await Vendor.findById(vendorId);


        const user = await User.findByIdAndUpdate(id , {
            name
        });

        await user.save();

        vendorDetails.contactNumber = contactNumber;
        vendorDetails.gstNumber = gstNumber;
        vendorDetails.shopName = shopName;
        vendorDetails.gstInvoice = gstInvoice;

        await vendorDetails.save()

        const updatedVendor = await User.findById(id).populate("vendorDetails").exec();

        return res.status(200).json({
            success:true,
            message:"vendor profile updated successfully",
            data:updatedVendor,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in updating the vendor"
        })
    }
}

exports.deleteAccount = async(req,res) => {
    try {
        const id = req.user.id;

        const user = await User.findById({_id:id});

        if(!user) {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        await Vendor.findByIdAndDelete({_id:user.vendorDetails});

        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"User account Deleting successfully"
        });

    } catch(error) {
        console.log(error);
        res.status(500).josn({
            success:false,
            message:"user not found for deleting the account"
        })
    }
}

exports.getAllVendorDetails = async(req,res) => {
    try {

        const id = req.user.id;

        const vendorDetails = await User.findById(id).populate("vendorDetails");

        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            data:vendorDetails
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while geting all uasers",
            error:error.message
        })
    }
}

exports.intrestedProducts = async(req,res) => {
    try{
        const id = req.user.id;

        const vendorDetails = await User.findOne({_id:id}).populate("products").exec();

        if(!vendorDetails) {
            return res.status(400).json({
                success:false,
                message:"could not find the user"
            });
        }

        return res.status(200).json({
            success:true,
            data:vendorDetails.products
        })
    } catch (error) {

    }
}