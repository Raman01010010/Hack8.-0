import User from "../models/user.js";
import Project from "../models/project.js";
import Equipment from "../models/equipment.js";
import dotenv from "dotenv"
import Consumable from "../models/consumable.js";
dotenv.config()

export const addequipment = async (req, res, next) => {
    try {
        const reqbody = req.body
        try {
            const equipment= new Equipment({...reqbody,Status:"false"})
            await equipment.save()
            const newproject = await Project.findByIdAndUpdate(reqbody.ProjectId, { $push: { Equipments: equipment._id } }, { new: true });
            await newproject.save()
            res.status(200).json({ message: "equipment added successfully", equipment });
        }
        catch (e) {
            res.status(500).json({ message: 'Server error' });
        }
    } catch (err) {
        next(err);
        console.log(err);
    }
};

export const getequipment = async (req, res, next) => {
    try {
        const { equipmentId, projectId } = req.body

        if (!equipmentId || !projectId) {
            return res.status(400).json({ message: "equipmentId and projectId are required" })
        }

        const equipment = await Equipment.findById(equipmentId)
        if (!equipment) {
            return res.status(404).json({ message: "equipment not found" })
        }

        const project = await Project.findById(projectId)
        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        if (!project.Equipments.includes(equipmentId)) {
            return res.status(403).json({ message: "equipment not associated with this project" })
        }

        res.status(200).json({ message: "equipment fetched successfully",equipment })
    } catch (err) {
        next(err)
    }
}

