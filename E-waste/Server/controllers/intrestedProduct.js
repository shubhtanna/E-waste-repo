import {Product} from "../models/Product.js";
import { User } from "../models/User.js";
import { mailsender } from "../utils/mailSender.js";

export const addintrest = async(req,res) => {
    try {
        // console.log("product id:",req)
        const {product_id} = req.body;
        const userId = req.user.id;

        if(!product_id){
            return res.status(400).json({
                success:false,
                message:'please provide the product id'
            })
        }

        const product = await Product.findById({_id:product_id});
        
        if(!product){
            return res.status(400).json({
                success:false,
                mesage:"could not find the product"
            });
        }

        // const uid = new mongoose.Types.ObjectId(userId);
        // if(product.intrestedUser.includes(uid)){
        //     return res.status(200).json({
        //         success:false,
        //         message:"You are alreadt submit you intrested in this product"
        //     })
        // }

        const {price} = req.body;

        if(!price){
            return res.status(400).json({
                success:false,
                message:"Please enter your estimeted price"
            })
        };

        const addIntrestedProduct = await Product.findOneAndUpdate({_id:product_id},{
            $push:{
                intrestedUser:userId,
                price:price
            },
        },{new:true});

        console.log(addIntrestedProduct);

        const intrestedUser = await User.findOneAndUpdate({_id:userId},{
            $push:{
                products:product_id 
            }
        },{new:true}).populate("products").exec();

        console.log(intrestedUser);

        const emailResponse = await mailsender(intrestedUser.email,
            "Thanks for your Intrest",
            `Now you are on boarded for the product ${addIntrestedProduct.name}`)

        console.log(emailResponse);

        return res.status(200).json({
            success:true,
            message:"you are sessfully add your intrest in this product"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            Message:error.message
        })
    }
}

export const getAllIntrestedUsers = async (req,res) => {
    try {

        const {product_id} = req.body;

        if(!product_id){
            return res.status(400).json({
                success:false,
                message:'please provide the product id'
            })
        }

        const product = await Product.findById(product_id).populate(
            {
                path:"intrestedUser"
            }
        ).populate({
            path:"price"
        }).exec();

        return res.status(200).json({
            success:true,
            data:product
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in geting all intrested users"
        })
    }
}