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

app.get('/api/state/:id', async (req, res) => {
  console.log('Received request for state:', req.params.id); 
  try {
    const stateId = parseInt(req.params.id);
    const state = await db.collection('states_data').findOne({ id: state });
    
    console.log('Found in database:', state);
    
    if (!state) {
      console.log('State not found in database');
      return res.status(404).json({ error: 'State not found' });
    }
    res.json(state);
  } catch (err) {
    console.error('Server error:', err);
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