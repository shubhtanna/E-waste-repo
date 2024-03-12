import {User} from '../models/User.js';
import { respond } from '../utils/response.js';

export const getShopByCity =  async(req,res)=>{
    try{

        const {city,id} =  req.user;
        console.log(city,id);
        
        const shop = await User.find({city:city,accountType:'Vendor'});

        return respond(res,"All the Shops fetched by city",200,true,shop);

    }catch(error){
        console.log("Error in fetching shop by city : ",error);
        return respond(res,"All the Shops are not fetched by city",500,false);
    }
}