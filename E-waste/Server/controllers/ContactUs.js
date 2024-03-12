import {Contact} from "../models/ContactUs.js"
import { mailsender } from "../utils/mailSender.js";
import {contactUsEmail} from '../templates/contactFormRes.js';
import { respond } from '../utils/response.js';

export const contactUs = async(req,res)=>{
    try{
        const {name,email,message} = req.body;

        const emailResponse = await mailsender(email,"Your data submit successfully",contactUsEmail(name,email,message));

        const contact = await Contact.create({name,email,message});
        console.log("Contact Response : ",contact);

        // return res.json({
        //     success:true,
        //     message:"Email for contact us successfully",
        // });
    return respond(res,"Email for contact us send successfully",200,true,contact);


    }catch(error){
        console.log("Error", error)
        console.log("Error message :", error.message)
        // return res.json({
        //   success: false,
        //   message: "Something went wrong...",
        // });
        return respond(res,"Something went wrong while sending email response for contact us",500,false);
    }
}