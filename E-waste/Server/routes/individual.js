import express from "express";
import { auth,isIndividual } from "../middlewares/auth.js";
import { getShopByCity } from "../controllers/Vendor.js";

const router = express.Router();

router.get("/getshopbycity",auth,isIndividual,getShopByCity)

export default router;