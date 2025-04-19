const express = require('express');
const bidsController = require('../controllers/bidsController');
const router = express.Router();

// Route for uploading startup details (JSON data)
router.post('/bidsOnMe', bidsController.fetchBidsOnMe);


module.exports = router;
