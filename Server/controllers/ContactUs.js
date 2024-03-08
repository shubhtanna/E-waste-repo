import {ContactUs} from '../models/ContactUs.js';
import {mailSender} from '../utils/mailSender.js';
import {contactUsEmail} from '../templates/contactFormRes.js';

export const contactUsController = async(req,res)=>{
    try{
        const {name,email,message} = req.body;

        const emailResponse = await mailSender(email,"Your data submit successfully",contactUsEmail(name,email,message));

        const contact = await ContactUs.create({name,email,message});
        console.log("Contact Response : ",contact);

        return res.json({
            success:true,
            message:"Email for contact us successfully",
        });


    }catch(error){
        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.json({
          success: false,
          message: "Something went wrong...",
        });
    }
}