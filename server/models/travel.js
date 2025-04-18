import mongoose from "mongoose";
const TravelSchema = new mongoose.Schema({
    ProjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Project,
        required:true
    },
    Source:{
        type:String,
        required:true
    },
    Destination:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    Amount:{
        type:Number,
        required:true,
    },
    Status:{
        type:Boolean,
    },
    AcceptedDate:{
        type:Date
    },
    Document:{
        type:String
    }
},{timestamps: true});

export default mongoose.model("Travel",TravelSchema)