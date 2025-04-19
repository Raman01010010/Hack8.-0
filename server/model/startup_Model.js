const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId, // Reference to another document
        required: [true, 'userid is required'],
        ref: 'User' // Name of the referenced model
    },
    name: {
        type: String,
        required: [true, 'Startup name is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'web', 'health', 'cleantech', 'analytics', 'mobile', 'education', 'medical',
            'games_video', 'enterprise', 'software', 'news', 'ecommerce', 'government',
            'other', 'security', 'biotech', 'network_hosting', 'finance', 'advertising',
            'photo_video', 'travel', 'public_relations', 'social', 'transportation',
            'hospitality', 'manufacturing', 'sports', 'nonprofit', 'search', 'fashion',
            'messaging', 'consulting', 'music', 'hardware', 'legal', 'semiconductor',
            'real_estate', 'automotive', 'nanotech', 'design', 'pets', 'local'
        ]
    },
    region: {
        type: String,
        required: [true, 'Region is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    foundedYear: {
        type: Number,
        required: [true, 'Founded year is required'],
        min: [1900, 'Founded year must be after 1900'],
        max: [new Date().getFullYear(), 'Founded year cannot be in the future']
    },
    fundingRounds: {
        type: Number,
        required: [true, 'Number of funding rounds is required'],
        min: [0, 'Funding rounds cannot be negative']
    },
    investors: {
        type: Number,
        required: [true, 'Number of investors is required'],
        min: [0, 'Number of investors cannot be negative']
    },
    milestones: {
        type: Number,
        required: [true, 'Number of milestones is required'],
        min: [0, 'Number of milestones cannot be negative']
    },
    pitch: {
        type: String,
        required: [false],
        trim: true,
        // maxlength: [100000, 'Pitch cannot be more than 10000 characters']
    },
    idCard: {
        type: String,
        required: false
    },
    bankPassbook: {
        type: String,
        required: false
    },
    biddedBy: [{
        // Updated to store an object with the bidder's user id and bidding amount
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        biddingAmount: { type: Number, required: true }
    }],
    pdfDocument: {
        type: String,
        required: [false]
    },
    isIdVerified: {
        type: Boolean,
        default: false // Default value is false
    },
    isBankPassbookVerified: {
        type: Boolean,
        default: false // Default value is false
    },
    isPdfDocumentVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Startup', startupSchema);