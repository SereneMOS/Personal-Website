const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '../..'))); // Serve files from root

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../travelmap.html'));
});

// API endpoint for state data
app.get('/api/state/:id', async (req, res) => {
  try {
    const state = await db.collection('states_data')
    .findOne({ id: parseInt(req.params.id) });
    res.json(state || { error: 'State not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
let db;

MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true })
  .then(client => {
    db = client.db('states');
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));