import express from "express"
import { updateVendor } from "../controllers/Vendor.js";
import { auth, isVendor } from "../middlewares/auth.js";
import {getAllIntrestedUsers, addintrest} from "../controllers/intrestedProduct.js"
import { getAllProducts } from "../controllers/Product.js";
import  {intrestedProducts} from "../controllers/Vendor.js"

const router = express.Router();

router.put("/updatevendordetails",auth,isVendor,updateVendor)
router.post("/interestedproduct",auth,isVendor,addintrest)
router.get("/getallproducts",auth,isVendor,getAllProducts)
router.get("/getallinterestedproducts",auth,isVendor,intrestedProducts)
router.get("/getallinterestedusers",auth,getAllIntrestedUsers)

export default router;