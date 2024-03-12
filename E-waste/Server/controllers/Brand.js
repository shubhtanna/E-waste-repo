import { respond } from "../utils/response.js";
import { Brand } from '../models/Brand.js';
import { Category } from "../models/Category.js";

export const createBrand = async(req,res)=>{
    try{
       
        const { name , categoryId } = req.body;

        if(!name || !categoryId){
            return respond(res,"Brand Name is missing ",404,false);
        }

        const brand = await Brand.create({name,categoryId:categoryId});

        await Category.findByIdAndUpdate({
            _id:categoryId
        },
        {
            $push:{
                Brand : brand._id
            }
        },{new : true});
        
        return respond(res,"Brands added successfully",200,true,brand);
        

    }catch(error){
        console.log("Error in create brand : ",error);
        return respond(res,"Error while creating brand",500,false);
    }
}


export const updateBrand = async(req,res)=>{
    try{
        const {brandId,name}  = req.body;

      const brandExist =  await Brand.findByIdAndUpdate(brandId,{
        name:name
        });
        

      if(!brandExist){
        return respond(res,"There is no such brand",500,false);
      }
      
      return respond(res,"Brands updated successfully",200,true,brandExist);
      

    }catch(error){
        console.log("Error in update Brand : ",error);
        return respond(res,"Error while updating brand",500,false);

    }
}

export const deleteBrand = async(req,res)=>{
    try{

        const {brandId} = req.body;
        
       await Brand.findByIdAndDelete(brandId);

       return respond(res,"Delete brand successfully",200,true);


    }catch(error){
        console.log("Error in delete Brand : ",error);
        return respond(res,"Error while deleting brand",500,false);

    }
}