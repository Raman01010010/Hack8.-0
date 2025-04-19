require('dotenv').config();
const express = require('express');
const app = express();
const uploadDetailsRouter = require('./routes/uploadDetails');

app.use(express.json());
app.use('/api', uploadDetailsRouter);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});