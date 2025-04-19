const Startup = require('../model/startup_Model');
const Investor = require('../model/investor_Model');

const handleFilterStart = async (req, res) => {
    console.log("Received formData:", req.body);
    const { categories } = req.body; // expecting req.body.categories to be an array
    try {
        const startups = await Startup.find({ category: { $in: categories } });
        console.log(startups);
        res.status(200).json({ message: "Startups retrieved!", data: startups });
    } catch (error) {
        console.error("Error fetching startups:", error);
        res.status(500).json({ message: "Server error while fetching startups." });
    }
};

const handleBid = async (req, res) => {
    try {
        const { startupId, userId, biddingAmount } = req.body;
        if (!startupId || !userId || biddingAmount === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const startup = await Startup.findById(startupId);
        if (!startup) {
            return res.status(404).json({ message: "Startup not found" });
        }

        // Append the bid to the biddedBy array in the startup model
        startup.biddedBy.push({ userId, biddingAmount });
        await startup.save();

        // Find the investor and update their bidded_to field
        const investor = await Investor.findById(userId);
        if (!investor) {
            return res.status(404).json({ message: "Investor not found" });
        }

        investor.bidded_to.push({ startupId, biddingAmount });
        await investor.save();

        res.status(200).json({ message: "Bid placed successfully!", data: { startup, investor } });
    } catch (error) {
        console.error("Error placing bid:", error);
        res.status(500).json({ message: "Server error while placing bid." });
    }
};

const handlegetallbids = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "Missing user id" });
        }

        const startups = await Startup.find({ "biddedBy.userId": userId });
        console.log("Startups with bids from user:", startups);

        res.status(200).json(startups);
    } catch (error) {
        console.error("Error fetching bids:", error);
        res.status(500).json({ message: "Server error while fetching bids." });
    }
};

module.exports = { handleFilterStart, handleBid, handlegetallbids };