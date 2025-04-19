const express = require('express');
const ob1= require('../controllers/startupController');

const router = express.Router();
 
router.post('/filter', ob1.handleFilterStart);
router.post('/bid', ob1.handleBid);
router.post('/getbid', ob1.handlegetallbids);

module.exports = router;