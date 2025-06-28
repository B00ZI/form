const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // optional
const formRoutes = require('./routes/formRoutes');
const db = require('./config/db'); // Import database configuration
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // 🚨 REQUIRED for JSON
// app.use(bodyParser.json()); // Optional

const path = require('path');

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Routes
app.use('/api/form', formRoutes);

// Connect to the database
(async () => {
  try {
    await db.connect(); // Assuming db.connect() establishes the connection
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
