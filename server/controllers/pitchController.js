const Startup = require('../model/startup_Model');

const handlePitchConverter = async (req, res) => {
  const { startupid, pitch } = req.body;

  if (!startupid || typeof pitch !== 'string') {
    return res.status(400).json({ error: 'startupid and pitch string are required.' });
  }

  try {
    // Find the startup by its ID
    const startup = await Startup.findById(startupid);

    if (!startup) {
      return res.status(404).json({ error: 'Startup not found.' });
    }

    // Update the pitch field
    startup.pitch = pitch;
    await startup.save();

    res.status(200).json({ message: 'Pitch updated successfully.', data: startup });
  } catch (error) {
    console.error('Error updating pitch:', error);
    res.status(500).json({ error: 'Server error.' });
  }
};

module.exports = { handlePitchConverter };