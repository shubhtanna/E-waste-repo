import express from "express";

const app = express();

import dotenv from "dotenv";
import { cloudinaryConnect } from "./config/cloudinary.js";
import { connectDB } from "./config/db.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { respond } from "./utils/response.js";
import userRouter from "./routes/user.js";
import individualRouter from "./routes/individual.js";

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

app.use("/api/v1/auth",userRouter);
app.use("/api/v1/individual",individualRouter)

app.get("/", (req,res) => {
    return respond(res,"Your server is up and running",20,true)
});

app.listen(PORT, () => {
    console.log(`your server started at ${PORT}`);
})