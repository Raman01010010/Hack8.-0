import User from "../models/user.js";
import Project from "../models/project.js";
import Contingancy from "../models/contingancy.js";
import dotenv from "dotenv"
import Consumable from "../models/consumable.js";
dotenv.config()

export const addcontingancy = async (req, res, next) => {
    try {
        const reqbody = req.body
        try {
            const contingancy= new Contingancy({...reqbody,Status:"false"})
            await contingancy.save()
            const newproject = await Project.findByIdAndUpdate(reqbody.ProjectId, { $push: { Contingancies: contingancy._id } }, { new: true });
            await newproject.save()
            res.status(200).json({ message: "contingancy added successfully", contingancy });
        }
        catch (e) {
            res.status(500).json({ message: 'Server error' });
        }
    } catch (err) {
        next(err);
        console.log(err);
    }
};

export const getcontingancy = async (req, res, next) => {
    try {
        const { contingancyId, projectId } = req.body

        if (!contingancyId || !projectId) {
            return res.status(400).json({ message: "contingancyId and projectId are required" })
        }

        const contingancy = await Contingancy.findById(contingancyId)
        if (!contingancy) {
            return res.status(404).json({ message: "contingancy not found" })
        }

        const project = await Project.findById(projectId)
        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        if (!project.Contingancies.includes(contingancyId)) {
            return res.status(403).json({ message: "contingancy not associated with this project" })
        }

        res.status(200).json({ message: "contingancy fetched successfully",contingancy })
    } catch (err) {
        next(err)
    }
}

