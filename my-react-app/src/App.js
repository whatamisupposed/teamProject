import './App.css';



const express = require('express');
const { sequelize } = require('./models');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const port = process.env.port || 5432

app.use(express.json());

app.use('/api', studentRoutes);
app.use('/api', courseRoutes);

sequelize.sync().then(() => {
  app.listen(2341, () => {
    console.log(`Server is running on port ${2341}`);
  });
});



export default App;
