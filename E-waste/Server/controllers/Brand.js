import { respond } from "../utils/response";
import { Brand } from '../models/Brand.js';

export const createBrand = async(req,res)=>{
    try{
       
        const { name } = req.body;

        if(!name){
            return respond(res,"Brand Name is missing ",404,false);
        }

        const brand = await Brand.create({name});
        
        return respond(res,"Brands added successfully",200,true,brand);
        

    }catch(error){
        console.log("Error in create brand : ",error);
        return respond(res,"Error while creating brand",500,false);
    }
}


export const updateBrand = async(req,res)=>{
    try{
        const {id,name}  = req.body;

      const brandExist =  await Brand.findByIdAndUpdate(id,
        { $push : {name:name}},{new : true}
        );

      if(!brandExist){
        return respond(res,"There is no such brand",500,false);
      }
      
      return respond(res,"Brands updated successfully",200,true,brand);
      

    }catch(error){
        console.log("Error in update Brand : ",error);
        return respond(res,"Error while updating brand",500,false);

    }
}

export const deleteBrand = async(req,res)=>{
    try{

        const {id} = req.body;
        
       await Brand.findByIdAndDelete(id);

       return respond(res,"Delete brand successfully",200,true);


    }catch(error){
        console.log("Error in delete Brand : ",error);
        return respond(res,"Error while deleting brand",500,false);

    }
}