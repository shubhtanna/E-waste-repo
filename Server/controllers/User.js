import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
      const { name, email, password,confirmpassword } = req.body;
  
      const user = await User.findOne({ email });
  
      if (user) return res.status(404).json({
        success: false,
        message: "User Already Exist"
      })

      if (password != confirmpassword) {
        return res.status(201).json({
          success: false,
          message: "Password and Confirmpassword doesn't match",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newuser = await User.create({ name, email, password: hashedPassword,confirmpassword });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newuser,
      });

    } catch (error) {
        console.error("Error in register function:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
      }
  };