import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../my-react-app/src/App';
import reportWebVitals from '../my-react-app/src/reportWebVitals';

const port = process.env.port || 5432

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');

const sequelize = new Sequelize(config.development);

const Student = require('../models/student')(sequelize, DataTypes);
const Course = require('../models/course')(sequelize, DataTypes);
const Registration = require('./registration')(sequelize);

Student.belongsToMany(Course, { through: Registration });
Course.belongsToMany(Student, { through: Registration });

module.exports = {
  sequelize,
  Student,
  Course,
  Registration,
};
