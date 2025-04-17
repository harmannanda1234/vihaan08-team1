// server.js
const express = require('express');
const { admin, db } = require('./firebase');
const sessionRoutes = require('./routes/session');  // Import session routes
const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Use routes for session
app.use('/api/session', sessionRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
