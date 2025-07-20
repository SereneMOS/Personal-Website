const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
app.use(cors());

// MongoDB Atlas connection
const MONGODB_URI = process.env.MONGODB_URI;
let db;

MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true })
  .then(client => {
    db = client.db('states'); // Connect to 'states' database
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => console.error('Connection error:', err));

// Get state description by ID
app.get('/api/state/:id', async (req, res) => {
  try {
    const state = await db.collection('states_data')
      .findOne({ id: parseInt(req.params.id) });
    
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.json({ description: state.description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));