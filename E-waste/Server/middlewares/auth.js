import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const auth = async(req,res,next) => {
    try{

        const token = req.cookies.token || req.body.token || req.header("authorization").replace("Bearer ","");

        if(!token){
            return res.status(400).json({
                success:false,
                message:"token is missing"
            });
        }

        try {

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success:false,
                message:"token is invalid",
                error:error.message
            })
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}


export const isIndividual = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Individual"){
            return res.status(400).json({
                success:false,
                message:"This protected route for individual users only"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user role not verify"
        })
    }
}

export const isVendor = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Vendor"){
            return res.status(400).json({
                success:false,
                message:"This protected route for Vendor users only"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user role not verify"
        })
    }
}

export const isOrganization = async (req,res) => {
    try{
        if(req.user.accountType !== "Organization"){
            return res.staus(400).json({
                success:false,
                message:"This protected route for Organization users only"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user role not verify"
        })
    }
}

export const isAdmin = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                success:false,
                message:"This protected route for admin users only"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user role not verify"
        })
    }
}