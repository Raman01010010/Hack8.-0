const express=require('express')
const router=express()
const startup_Controller=require('../controllers/startup_Controller')

router.post('/uploadDetail',startup_Controller.uploadDetails)
router.post('/upload-documents',startup_Controller.uploadDocuments)


module.exports=router