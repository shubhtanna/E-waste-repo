import express from "express"
<<<<<<< HEAD
import { sendOtp, singUp } from "../controllers/Auth.js"
const router = express.Router()
=======
import { signup } from "../controllers/user.js";
import { getShopByCity } from "../controllers/Vendor.js";
>>>>>>> 74954bfb993d2cd5cccd4762c4e3035ba5345a78

router.post("/singup",singUp)
router.post("/sendotp",sendOtp)



router.post("/getShopByCity", getShopByCity);

export default router;