import User from "../models/user.js";
import Project from "../models/project.js"
import dotenv from "dotenv"
dotenv.config()

export const addProject = async (req, res, next) => {
    try {
        const reqbody = req.body
        try {
            const project = new Project(reqbody)
            await project.save()
            const newuser = await User.findByIdAndUpdate(reqbody.userId, { $push: { projects: project._id } }, { new: true });
            await newuser.save()
            res.status(200).json({ message: "project added successfully", booking });
        }
        catch (e) {
            res.status(500).json({ message: 'Server error' });
        }
    } catch (err) {
        next(err);
        console.log(err);
    }
};

export const getProject = async (req, res, next) => {
    try {
        const { userId, projectId } = req.body

        if (!userId || !projectId) {
            return res.status(400).json({ message: "userId and projectId are required" })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const project = await Project.findById(projectId)
        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        if (!user.projects.includes(projectId)) {
            return res.status(403).json({ message: "Project not associated with this user" })
        }

        res.status(200).json({ message: "Project fetched successfully", project })
    } catch (err) {
        next(err)
    }
}

