import User from "../models/user.js";
import Project from "../models/project.js"
import dotenv from "dotenv"
dotenv.config()

export const getProjects = async (req, res, next) => {
    try {
        const {userId} = req.body

        if (!userId) {
            return res.status(400).json({ message: "userId is required" })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const projects = user.projects

        res.status(200).json({ message: "Projects fetched successfully", projects })
    } catch (err) {
        next(err)
    }
}

export const getUser = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.json({message:"User retrieved",user})
    }catch(err){
        res.json({message:"User not found"})
        console.log(err)
    }
}