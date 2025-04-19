const express=require('express')
const router=express()
const investor_Controller=require('../controllers/investor_Controller')

router.post('/investor-signup',investor_Controller.registerInvestor)

router.post('/investor-login',investor_Controller.loginInvestor)

module.exports=router