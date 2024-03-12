import express from "express";
import { auth,isIndividual } from "../middlewares/auth.js";
import { deleteAccount, getShopByCity } from "../controllers/Vendor.js";
import { createProduct, deleteProduct, updateProduct } from "../controllers/Product.js";
import { getProductsPost, updateIndividual } from "../controllers/Individual.js";
const router = express.Router();

router.get("/getshopbycity",auth,isIndividual,getShopByCity)
router.post("/createproduct",auth,isIndividual,createProduct)
router.put("/updateindividualdetails",auth,isIndividual,updateIndividual)
router.delete("/deleteaccount",auth,deleteAccount)
router.delete("/deleteproduct",auth,isIndividual,deleteProduct)
router.put("/updateproduct",auth,isIndividual,updateProduct)
router.get("/getuserproducts",auth,isIndividual,getProductsPost)

export default router;