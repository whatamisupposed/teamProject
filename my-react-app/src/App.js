const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 5432;

app.use(express.json());

// API routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);

// Serve React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// Start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Protected from './Protected';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/protected" component={Protected} />
      </Switch>
    </Router>
  );
}

export default App;
