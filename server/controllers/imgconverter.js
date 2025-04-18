// controller that confirms receipt of the image
const handleImgConverter = async (req, res) => {
  if (!req.file) {
    console.log('No file received');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Log metadata about the received file
  console.log('Received file metadata:', {
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });

  // Log the buffer length to confirm full content is received
  console.log('Received file content buffer length:', req.file.buffer.length);

  res.json({ message: 'File received' });
};

module.exports = { handleImgConverter };

