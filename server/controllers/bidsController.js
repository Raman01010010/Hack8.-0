const Startup = require('../model/startup_Model');
const Investor = require('../model/investor_Model'); // Assuming you have an Investor model

const fetchBidsOnMe = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find startups by userId and populate biddedBy with investor details
    const startups = await Startup.find({ userid: userId, biddedBy: { $exists: true, $not: { $size: 0 } } })
      .select('name biddedBy')
      .populate('biddedBy.userId', 'name email'); // Populate investor name and email from the Investor schema

    if (!startups || startups.length === 0) {
      return res.status(404).json({ message: 'No startups with bids found for this user' });
    }

    // Format the response to include all required fields
    const formattedResponse = startups.map((startup) => {
      return startup.biddedBy.map((bid) => {
        // Handle cases where userId or name/email is null
        const investorName = bid.userId && bid.userId.name ? bid.userId.name : 'Unknown Investor';
        console.log("hhh ",bid)                      
        return {
          startupName: startup.name,
          investorName,
          amount: bid.biddingAmount,
          equity: bid.equity || 'N/A', // Assuming equity is optional
          status: bid.status || 'pending', // Assuming status is optional
        };
      });
    }).flat(); // Flatten the array of arrays

    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  fetchBidsOnMe,
};
