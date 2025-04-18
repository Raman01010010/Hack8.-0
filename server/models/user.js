import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    password:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    projects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"
    }],
    role:{
        type:String
    },
},{timestamps: true});

export default mongoose.model("User",userSchema)