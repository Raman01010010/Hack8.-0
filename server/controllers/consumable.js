import User from "../models/user.js";
import Project from "../models/project.js";
import consumable from "../models/consumable.js";
import dotenv from "dotenv"
import Consumable from "../models/consumable.js";
dotenv.config()

export const addConsumable = async (req, res, next) => {
    try {
        const reqbody = req.body
        try {
            const consumable= new Consumable({...reqbody,Status:"false"})
            await consumable.save()
            const newproject = await Project.findByIdAndUpdate(reqbody.ProjectId, { $push: { Consumables: consumable._id } }, { new: true });
            await newproject.save()
            res.status(200).json({ message: "consumable added successfully", consumable });
        }
        catch (e) {
            res.status(500).json({ message: 'Server error' });
        }
    } catch (err) {
        next(err);
        console.log(err);
    }
};

export const getConsumable = async (req, res, next) => {
    try {
        const { consumableId, projectId } = req.body

        if (!consumableId || !projectId) {
            return res.status(400).json({ message: "consumableId and projectId are required" })
        }

        const consumable = await Consumable.findById(consumableId)
        if (!consumable) {
            return res.status(404).json({ message: "Consumable not found" })
        }

        const project = await Project.findById(projectId)
        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        if (!project.Consumables.includes(consumableId)) {
            return res.status(403).json({ message: "consumable not associated with this project" })
        }

        res.status(200).json({ message: "consumable fetched successfully",consumable })
    } catch (err) {
        next(err)
    }
}

