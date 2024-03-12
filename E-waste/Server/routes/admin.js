import express from "express"
import {auth,isAdmin} from "../middlewares/auth.js"
import { createCategory, deleteCategory, updateCategory } from "../controllers/Category.js";
import { createBrand, deleteBrand, updateBrand } from "../controllers/Brand.js";
import { getAllVendorDetails } from "../controllers/Vendor.js";
import { getAllUserDetails } from "../controllers/Individual.js";

const router = express.Router();

router.post("/createcategory",auth,isAdmin,createCategory)
router.put("/updatecategory",updateCategory)
router.delete("/deletecategory",deleteCategory)

router.post("/createbrand",auth,isAdmin,createBrand)
router.put("/updatebrand",auth,isAdmin,updateBrand)
router.delete("/deletebrand",auth,isAdmin,deleteBrand)

router.get("/getallvendor",auth,isAdmin,getAllVendorDetails)
router.get("/getallindividual",auth,isAdmin,getAllUserDetails)

export default router