import express from "express";
import { auth,isIndividual } from "../middlewares/auth.js";
import { deleteAccount, getShopByCity } from "../controllers/Vendor.js";
import { createProduct } from "../controllers/Product.js";
import { updateIndividual } from "../controllers/Individual.js";
const router = express.Router();

router.get("/getshopbycity",auth,isIndividual,getShopByCity)
router.post("/createproduct",auth,isIndividual,createProduct)
router.put("/updateindividualdetails",auth,isIndividual,updateIndividual)
router.delete("/deleteaccount",auth,deleteAccount)

export default router;