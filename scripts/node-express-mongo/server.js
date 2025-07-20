const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://rosalineaflow:kRfaWkzT6WCoZKNR@cluster0.pyyak8a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(express.static(path.join(__dirname, '../../')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../travelmap.html'));
});

app.get('/textline/:lineNumber', async (req, res) => {
  const lineNumber = parseInt(req.params.lineNumber);
  const textline = await db.collection('textlines').findOne({ lineNumber });
  res.send(textline || { error: "Line not found" });
});

// Database Connection
MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));