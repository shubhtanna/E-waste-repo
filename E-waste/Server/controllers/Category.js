import {Category} from '../models/Category.js';

export const createCategory = async(req,res)=>{
    try{
        const {categoryName,productId} = req.body;

        if(!categoryName){
            return respond(res,"category name is not mentioned",404,false);
        }
        
        const category = Category.create({categoryName,productId});

        return respond(res,"Categories added successfully",200,true,category);

    }catch(error){
        console.log("Error in creating category : ",error);
        return respond(res,"Error while creating category",500,false);
    }
}


export const updateCategory = async(req,res)=>{
    try{

        const {categoryId,categoryName} = req.body;

        if(!categoryId){
            return respond(res,"update category",404,false);
        }

        await Category.findByIdAndUpdate(id,{
            $push:{
                name : categoryName,
            }
        })
        
        return respond(res,"Update category ",200,true);
       
    }catch(error){
        console.log("Error in creating category : ",error);
        return respond(res,"Error while update category",500,false);
    }
}

export const deleteCategory = async(req,res)=>{
    try{
        const {categoryId} = req.body;

        await Category.findByIdAndDelete({_id : categoryId});

        return respond(res,"delete category ",200,true);


    }catch(error){
        console.log("Error in deleting category : ",error);
        return respond(res,"Error while deleting category",500,false);

    }
}