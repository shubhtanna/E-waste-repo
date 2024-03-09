import express from "express";

const app = express();

import dotenv from "dotenv";
import { cloudinaryConnect } from "./config/cloudinary.js";
import { connectDB } from "./config/db.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { respond } from "./utils/response.js";

dotenv.config();

const PORT = process.env.PORT || 4000

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
})
)
// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         credentials:true,
//     })
// )

cloudinaryConnect();

app.get("/", (req,res) => {
    return respond(res,"Your server is up and running",20,true)
});

app.listen(PORT, () => {
    console.log(`your server started at ${PORT}`);
})