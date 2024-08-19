const express = require('express');
const path = require('path');
const mongoose = require('./config/mongoose');
const profileRoutes = require('./routes/profileRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const signupRoutes = require('./routes/signupRoutes');
const accountRoutes = require('./routes/accountRoutes');
const usernameRoutes = require('./routes/usernameRoutes');
const securityRoutes = require('./routes/securityRoutes');
const isAdminRoutes = require('./routes/isAdminRoutes');
const deleteUserRoutes = require('./routes/deleteUserRoutes');
const studentListRoutes = require('./routes/studentListRoutes');

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
app.use('/api/signup', signupRoutes);
app.use('/', accountRoutes);
app.use('/api/username', usernameRoutes);
app.use('/api/security', securityRoutes);
app.use('/api', isAdminRoutes);
app.use('/api', deleteUserRoutes);
app.use('/api/studentList', studentListRoutes);

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

