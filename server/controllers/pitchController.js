const Startup = require('../model/startup_Model');

const handlePitchConverter = async (req, res) => {
  const { userid, pitch } = req.body;

  if (!userid || typeof pitch !== 'string') {
    return res.status(400).json({ error: 'userid and pitch string are required.' });
  }
  console.log(userid,"gggggg",pitch);
  try {
    // Find a startup using the userid field.
    // Ensure your Startup schema includes a userid field linking it to a user.
    const allStartups = await Startup.find({});
    console.log("All Startups:", allStartups);
    const startup = await Startup.findOne({ userid });
    
    if (!startup) {
      return res.status(404).json({ error: 'Startup not found.' });
    }
    
    // Update the pitch field with the provided string.
    startup.pitch = pitch;
    await startup.save();
    
    res.status(200).json({ message: 'Pitch updated successfully.' });
  } catch (error) {
    console.error('Error updating pitch:', error);
    res.status(500).json({ error: 'Server error.' });
  }
};

module.exports = { handlePitchConverter };