import express from "express"
import { connectDB } from "./database/db.js";
import router from "./routes/user.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.listen(PORT , () => console.log("Server started"));

app.use("/api/v1/user",router);

app.get('/',(req,res) => {
    res.send("E-Waste Management")
})

connectDB();
