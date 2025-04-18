import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

export const signup = async (req, res, next) => {
    console.log(req.body)
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const existingUserEmail = await User.findOne({ email: req.body.email });
      if (existingUserEmail) {
        return res
          .status(400)
          .json({ success: false, message: "Email is already in use." });
      }
  
      const newUser = new User({ ...req.body, password: hash, phone: mobno });
  
      const userData = await newUser.save();
      if (userData) {
        res.status(200).json({ newUser });
      }
    } catch (err) {
      next(err);
      console.log(err);
    }
  };

  export const signin = async (req, res, next) => {

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) res.status(500).json({message:"Email not Found"});
      else{
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) {res.status(500).json({ message: "Incorrect password" });}
        else{
          const accesstoken = jwt.sign({id:user._id,email:user.email,username:user.username},secret,{expiresIn:"15m"})
          const { password, ...others } = user._doc;
        res
        .status(200)
        .json({others,accesstoken})
        }
      }
    } catch (err) {
      console.log(err);
    }
  };