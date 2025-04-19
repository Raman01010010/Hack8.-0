const express = require('express');
const ob1= require('../controllers/Video');

const router = express.Router();
router.post('/video', ob1.handlevideoprocess);
module.exports = router;