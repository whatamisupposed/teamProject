const mongoose = require('mongoose');

// Replace 'yourdbname' with the name of your MongoDB database
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://marceluswork:EfHQz2FfDvgPFAOI@student-registry.7ayse6a.mongodb.net/';

// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// Error handling
db.on('error', console.error.bind(console, 'connection error:'));

// Success message
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;



