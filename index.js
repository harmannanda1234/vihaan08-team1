// server.js
const express = require('express');
const { admin, db } = require('./firebase');
const sessionRoutes = require('./routes/session');  // Import session routes
const arouter = require('./routes/auth');
const verifyToken = require('./protected');
const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Use routes for session
app.use('/api/session', sessionRoutes);
app.use('/api/auth', arouter);
app.get('/',verifyToken, (req, res) => {
  res.send('Welcome to the API!');
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
