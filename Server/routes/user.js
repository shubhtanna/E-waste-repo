import express from "express"
import { sendOtp, singUp } from "../controllers/Auth.js"
const router = express.Router()

router.post("/singup",singUp)
router.post("/sendotp",sendOtp)

export default router;