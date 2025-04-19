const express = require('express');
const { handlePitchConverter } = require('../controllers/pitchController');
const router = express.Router();
 
router.post('/pitch', handlePitchConverter);
module.exports = router;