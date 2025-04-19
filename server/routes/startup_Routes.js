const express = require('express');
const { uploadDetails, uploadDocuments, uploadMiddleware } = require('../controllers/startup_Controller');
const router = express.Router();

// Route for uploading startup details (JSON data)
router.post('/upload-details', uploadDetails);

// Route for uploading documents (files) - uses multer middleware
router.post('/upload-documents', uploadMiddleware, uploadDocuments);

module.exports = router;
