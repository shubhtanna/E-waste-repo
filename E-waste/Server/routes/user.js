import express from "express"
import { sendOtp, singUp } from "../controllers/Auth.js"
import { getShopByCity } from "../controllers/Vendor.js"
const router = express.Router()

router.post("/singup",singUp)
router.post("/sendotp",sendOtp)



router.post("/getShopByCity", getShopByCity);

export default router;