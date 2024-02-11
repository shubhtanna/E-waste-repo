import express from "express"
import { signup } from "../controllers/user.js";

const router = express.Router();

router.post("/new", signup)

export default router;