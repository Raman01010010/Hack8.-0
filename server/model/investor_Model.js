const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    investmentRange: {
        type: String,
        required: [true, 'Investment range is required'],
        enum: ['0-50k', '50k-200k', '200k-1m', '1m+']
    },
    experience: {
        type: Number,
        required: [true, 'Experience is required']
    },
    bidded_to: [{
        // Updated to store an object with the startup id and the bidding amount
        startupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
        biddingAmount: { type: Number, required: true }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Investor', investorSchema);