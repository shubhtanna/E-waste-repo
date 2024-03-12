import express from "express"
import { updateVendor } from "../controllers/Vendor.js";
import { auth, isVendor } from "../middlewares/auth.js";

const router = express.Router();

router.put("/updatevendordetails",auth,isVendor,updateVendor)

export default router;