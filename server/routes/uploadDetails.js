const express=require('express')
const router=express()
const startup_Controller=require('../controllers/startup_Controller')
const s1=require('../controllers/startupController')

router.post('/uploadDetail',startup_Controller.uploadDetails)
router.post('/upload-documents',startup_Controller.uploadDocuments)
router.post('/getStartupsByUser', s1.getStartupsByUser)

module.exports=router