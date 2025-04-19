const multer = require('multer');
const path = require('path');
const Startup = require('../model/startup_Model'); // Import your Startup model

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('File type not allowed'), false);
    }
    cb(null, true);
  }
});

const uploadDetails = async (req, res) => {
    try {
        const { name, category, region, country, foundedYear, fundingRounds, investors, milestones, userid } = req.body;
        
        console.log("Received data:", req.body); // Log the received data for debugging
        // Validate required fields
        if (!name || !category || !region || !country || !foundedYear || !fundingRounds || !investors || !milestones) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Create a new startup entry in the database
        const startup = await Startup.create({
            userid, // Include the userid in the startup entry
            name,
            category,
            region,
            country,
            foundedYear,
            fundingRounds,
            investors,
            milestones
        });

        res.status(201).json({
            success: true,
            message: 'Startup details uploaded successfully',
            data: startup
        });
    } catch (error) {
        console.error('Error uploading startup details:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const uploadMiddleware = upload.fields([
  { name: 'idCard', maxCount: 1 },
  { name: 'bankPassbook', maxCount: 1 }
]);

const uploadDocuments = async (req, res) => {
  try {
    // Debug logs
    console.log('Content-Type:', req.headers['content-type']);
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);
    
    // If req.files is undefined, multer middleware isn't working
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: 'File upload middleware failed. Check server configuration.'
      });
    }

    // Check for specific file fields
    if (!req.files['idCard'] || !req.files['bankPassbook']) {
      return res.status(400).json({
        success: false,
        message: 'Both ID Card and Bank Passbook files are required'
      });
    }

    const { userid } = req.body;
    if (!userid) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const idCard = req.files['idCard'][0].path;
    const bankPassbook = req.files['bankPassbook'][0].path;

    const startup = await Startup.findOneAndUpdate(
      { userid },
      {
        idCard,
        bankPassbook,
        isIdVerified: false,
        isBankPassbookVerified: false
      },
      { new: true }
    );

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'Startup not found. Please create startup details first.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Documents uploaded successfully',
      data: {
        idCard: idCard.replace(/\\/g, '/'),
        bankPassbook: bankPassbook.replace(/\\/g, '/'),
        isIdVerified: startup.isIdVerified,
        isBankPassbookVerified: startup.isBankPassbookVerified
      }
    });
  } catch (error) {
    console.error('Error uploading documents:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = { 
    uploadDetails,
    uploadDocuments,
    uploadMiddleware
};