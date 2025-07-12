const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());

// MongoDB Connection (adjust URL as needed)
const url = 'mongodb://localhost:27017/clicks'; // Points to your 'clicks' DB
let db;

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(); // Uses 'clicks' DB (specified in URL)
    
    app.listen(8080, () => {
      console.log('Server running on http://localhost:8080');
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Add this endpoint to fetch a specific line by lineNumber
app.get('/textlines/:lineNumber', async (req, res) => {
  try {
    const lineNumber = parseInt(req.params.lineNumber);
    const textline = await db.collection('textlines').findOne({ lineNumber });
    
    if (!textline) {
      return res.status(404).send({ error: `Line ${lineNumber} not found` });
    }
    res.send(textline);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "Invalid line number" });
  }
});