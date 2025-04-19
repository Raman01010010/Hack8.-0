const Startup = require('../model/startup_Model'); // Import your Startup model

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

const uploadDocuments = async (req, res) => {
    try {
        const { userid, idCard, bankPassbook } = req.body;

        // Validate required fields
        if (!userid || !idCard || !bankPassbook) {
            return res.status(400).json({
                success: false,
                message: 'All documents and userid are required'
            });
        }
        
        // Validate base64 string format
        const isBase64 = (str) => {
            try {
                return Buffer.from(str.split(',')[1], 'base64').length > 0;
            } catch (err) {
                return false;``
            }
        };

        if (!isBase64(idCard) || !isBase64(bankPassbook)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid image format. Images must be base64 encoded.'
            });
        }

        // Update startup documents
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
    uploadDocuments 
};