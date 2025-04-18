import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    FundingAgency:{
        type:String,
        required:true,
    },
    Consumables:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Consumable"
    }],
    Contingancies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Contingancy"
    }],
    Equipments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Equipment"
    }],
    Travels:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Travel"
    }],
},{timestamps: true});

export default mongoose.model("Project",ProjectSchema)