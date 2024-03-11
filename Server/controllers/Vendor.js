import {User} from '../models/User.js';

export const getShopByCity =  async(req,res)=>{
    try{

        const {city,shopId} =  req.user;
        consolelog(city,shopId);

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