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
const editUserRoutes = require('./routes/editUserRoutes');
const adminCourseDeleteRoutes = require('./routes/adminCourseDeleteRoutes');
const adminCourseEditRoutes = require('./routes/adminCourseEditRoutes')
const adminCourseRoutes = require('./routes/adminCourseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Cors
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../frontend/student-registry-frontend/dist")));

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
app.use('/api', editUserRoutes);
app.use('/api', adminCourseDeleteRoutes);
app.use('/api', adminCourseEditRoutes);
app.use('/api', adminCourseRoutes);

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/student-registry-frontend/dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

