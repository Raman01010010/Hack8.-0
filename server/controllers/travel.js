import User from "../models/user.js";
import Project from "../models/project.js";
import Travel from "../models/travel.js";
import dotenv from "dotenv"
import Consumable from "../models/consumable.js";
dotenv.config()

export const addtravel = async (req, res, next) => {
    try {
        const reqbody = req.body
        try {
            const travel= new Travel({...reqbody,Status:"false"})
            await travel.save()
            const newproject = await Project.findByIdAndUpdate(reqbody.ProjectId, { $push: { Travels: travel._id } }, { new: true });
            await newproject.save()
            res.status(200).json({ message: "travel added successfully", travel });
        }
        catch (e) {
            res.status(500).json({ message: 'Server error' });
        }
    } catch (err) {
        next(err);
        console.log(err);
    }
};

export const gettravel = async (req, res, next) => {
    try {
        const { travelId, projectId } = req.body

        if (!travelId || !projectId) {
            return res.status(400).json({ message: "travelId and projectId are required" })
        }

        const travel = await Travel.findById(travelId)
        if (!travel) {
            return res.status(404).json({ message: "travel not found" })
        }

        const project = await Project.findById(projectId)
        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        if (!project.Travels.includes(travelId)) {
            return res.status(403).json({ message: "travel not associated with this project" })
        }

        res.status(200).json({ message: "travel fetched successfully",travel })
    } catch (err) {
        next(err)
    }
}

