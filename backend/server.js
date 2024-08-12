const express = require('express');
const path = require('path');
const mongoose = require('./config/mongoose');
const profileRoutes = require('./routes/profileRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// Configure CORS to allow the specific origin and include credentials
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // Allow credentials (cookies, authorization headers)
}));

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Routes
app.use('/api/user', profileRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/user', enrollmentRoutes);

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

