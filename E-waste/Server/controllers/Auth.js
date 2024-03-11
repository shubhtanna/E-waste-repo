import { User } from "../models/User.js"
import { Otp } from "../models/Otp.js"
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
import dotenv from "dotenv" 
import { respond } from "../utils/response.js";
import {emailverification} from "../templates/emailverification.js"
import {mailsender} from "../utils/mailSender.js";
import { Individual } from "../models/Individual.js";
import { Vendor } from "../models/Vendor.js";
import { Organization } from "../models/Organization.js";

dotenv.config()

export const sendOtp = async (req,res) => {
    try{
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email:email});
        
        console.log(checkUserPresent);

        if(checkUserPresent) {
            return respond(res,"User already exist",400,false)
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        console.log("otp generated: ", otp)

        let result = await Otp.findOne({otp:otp})

        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            result = await otp.findOne({otp:otp});
            //doubt
        }

        const otpPayload = {email,otp};

        const otpBody = await Otp.create(otpPayload);
        console.log(otpBody);

        const emailBody = emailverification(otp);
        mailsender(email,"your otp",emailBody)

        return respond(res,"Otp send successfully",200,true,otp)
    }
    catch(error) {
        console.log(error)
        console.log(error.message)
        return respond(res,"Something went wrong while sending the Otp",500,false)
    }
}

export const singUp = async (req,res) => {
    try{
        const {name,email,password,confirmPassword,address,city,pincode,otp,accountType} = req.body;

        if(!name || !address || !email || !password || !confirmPassword || !otp || !city || !pincode || !accountType) {
            return respond(res,"All fields are required while signup",400,false)
        }

        if(password !== confirmPassword) {
            return respond(res,"Passwords do not Match",400,false)
        } 

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return respond(res,"User is already exist",400,false)
        }

        const recentOtp = await Otp.find({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOtp);
        if(recentOtp.length === 0) {
            return respond(res,"Otp not found",400,false)
        }
        else if(otp !== recentOtp[0].otp){
            return respond(res,"Invalid Otp",400,false)
        }

        const hashPassword = await bcrypt.hash(password,10);

        let approved = ""
        (approved === "individual") 
            const individualDetails = await Individual.create({
                contactNumber: null,
            })
        
        (approved === "Vendor") 
            const vendorDetails = await Vendor.create({
                contactNumber: null,
                gstNumber: null,
                gstInvoice: null,
                shopName: null,
            })
        
        
            const organizationDetails = await Organization.create({
                organizationName: null,
                organizationType: null,
            })
    

        const user = await User.create({
            name,email,password,confirmPassword,accountType,address,city,pincode,individualDetails:individualDetails,
            vendorDetails:vendorDetails,organizationDetails:organizationDetails
        })

        return respond(res,"User is registerd Successfully",200,true)
    }
    catch(error) {
        console.log(error)
        return respond(res,"Something went wrong while singup",500,false);
    }
}

export const login = async(req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password) {
            return respond(res,"All fields are required",403,false)
        }

        const user = await User.findOne({email});

        if(!user) {
            return respond(res,"user is not registerd, Please signup first",404,false)
        }

        if(await bcrypt.compare(password,user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
                city: user.city,
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET, {
                expiresIn: "10h",
            })

            user.token = token;
            user.password = undefined

            const options = {
                expires: new Date(Date.now() + 3*2*60*60*1000),
                httpOnly: true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully",
            })
        }
        else{
            return respond(res,"Password is incorrect", 401,false)
        }
    }
    catch(error) {
        console.log(error);
        return respond(res,"Login failure, Please try againn",500,false)
    }
}