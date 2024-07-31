//server.js
const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config/config');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5432;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const student = await Student.findOne({ where: { username } });

    if (!student) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ id: student.id }, jwtSecret);

    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Protected route
app.get("/protected", auth, (req, res) => {
  res.send("This is a protected route");
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await sequelize.sync();
  console.log('Database synced');
});

