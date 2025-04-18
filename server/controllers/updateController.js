
const bcrypt = require('bcryptjs');
const users=require('../model/User')
const otp=require("../model/otpSchema")
const update=async (req, res) => {
    try {
      const userEmail = req.user;
      console.log(userEmail)
      console.log("bcbc")
      const updatedUserData = req.body; // The updated data for the user
  
      // Use findOneAndUpdate to update the user by their email

      //const upd=await feed1.findByIdAndUpdate(id,{$push:{likes:user}},{new:true});
         
      const updatedUser = await users.findOneAndUpdate(
        { email: userEmail },
        
        {$push:{skills:req.body?.skills[0]}},
       // {$push:{projects:req.body?.projects[0]}},
        //updatedUserData,
        { new: true } // To return the updated document
      );
      console.log(updatedUser)


      const updatedUser1 = await users.findOneAndUpdate(
        { email: userEmail },
        
        //{$push:{skills:req.body?.skills[0]}},
       {$push:{projects:req.body?.projects[0]}},
        //updatedUserData,
        { new: true } // To return the updated document
      );
      const updatedUser2 = await users.findOneAndUpdate(
        { email: userEmail },
        
        //{$push:{skills:req.body?.skills[0]}},
       {$push:{education:req.body?.education[0]}},
        //updatedUserData,
        { new: true } // To return the updated document
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json({updatedUser2,updatedUser1});
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while updating the user' });
    }
  }
module.exports = update;