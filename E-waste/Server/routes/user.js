import express from "express"
import { login, sendOtp, signUp } from "../controllers/Auth.js"
import { contactUs } from "../controllers/ContactUs.js"
import { auth } from "../middlewares/auth.js"
import { deleteAccount } from "../controllers/Vendor.js"
const router = express.Router()

router.post("/signup",signUp)
router.post("/sendotp",sendOtp)
router.post("/login",login)
router.post("/contactus",contactUs)
router.delete("/deleteaccount",auth,deleteAccount)

export default router;