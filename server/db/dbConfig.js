import mongoose from "mongoose"
import dotenv from "dotenv"
//Function to connect to database
dotenv.config();
export const connect =()=>{
    console.log(process.env.MONGO)
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("Database Connected...")
    })
    .catch((err)=>{
        
        throw err;
    })
}