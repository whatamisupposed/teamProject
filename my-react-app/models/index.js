import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../my-react-app/src/App';
import reportWebVitals from '../my-react-app/src/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');

const sequelize = new Sequelize(config.development);

const Student = require('./student')(sequelize, DataTypes);
const Course = require('./course')(sequelize, DataTypes);
const Registration = require('./registration')(sequelize);

Student.belongsToMany(Course, { through: Registration });
Course.belongsToMany(Student, { through: Registration });

module.exports = {
  sequelize,
  Student,
  Course,
  Registration,
};
