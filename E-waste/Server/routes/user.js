import express from "express"



import { sendOtp, singUp } from "../controllers/Auth.js"
import { getShopByCity } from "../controllers/Vendor.js"


import { login, sendOtp, signUp } from "../controllers/Auth.js"
import { contactUs } from "../controllers/ContactUs.js"

const router = express.Router()

router.post("/signup",signUp)
router.post("/sendotp",sendOtp)
router.post("/login",login)
router.post("/contactus",contactUs)


export default router;