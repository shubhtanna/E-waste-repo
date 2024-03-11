import express from "express"
import { signup } from "../controllers/user.js";
import { getShopByCity } from "../controllers/Vendor.js";

const router = express.Router();

router.post("/new", signup)



router.post("/getShopByCity", getShopByCity);

export default router;