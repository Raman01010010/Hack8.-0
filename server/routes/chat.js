const express=require('express')
const router=express()
const chatController=require('../controllers/chatController')
router.post('/',chatController.chat)
module.exports=router