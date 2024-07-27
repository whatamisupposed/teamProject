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
