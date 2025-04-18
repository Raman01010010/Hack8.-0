const express = require('express');
const multer  = require('multer');
const { handleImgConverter } = require('../controllers/imgconverter');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/ocr', upload.single('file'), handleImgConverter);

module.exports = router;