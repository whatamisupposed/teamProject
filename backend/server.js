const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('./config/mongoose');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const { jwtSecret } = require('./config/config');
const auth = require('./middleware/auth');
const logEvent = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5432;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Logging middleware
app.use((req, res, next) => {
  logEvent(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  console.log('Database synced');
});
