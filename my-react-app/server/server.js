const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 5432;

const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(bodyParser.json());

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(5432, () => {
  console.log(`Server listening on ${5432}`);
});

const express = require('express');


const users = []; // In-memory user storage

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
      return res.status(400).send('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
      return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id }, 'your_jwt_secret');

  res.status(200).send({ token });
});

const auth = require('./middleware/auth');

app.get('/protected', auth, (req, res) => {
    res.send('This is a protected route');
});
