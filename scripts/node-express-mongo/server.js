const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({                          
  origin: ['https://people.rit.edu', 'https://personal-website-wr0y.onrender.com']
}));
app.use(express.static(path.join(__dirname, '../..')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../travelmap.html'));
});

app.get('/api/state/:identifier', async (req, res) => {
  try {
    const identifier = req.params.identifier;
    let query;

    if (!isNaN(identifier)) {
      query = { id: parseInt(identifier) };
    } 
  
    else {
      query = { name: identifier };
    }

    const state = await db.collection('states_data').findOne(query);
    
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.json(state);
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

    db.collection('states_data').findOne({ id: 1 })
      .then(testState => console.log('Test query result:', testState)) 
      .catch(err => console.error('Test query failed:', err));

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));