const mongoose = require('mongoose');
const config = require('./config');

const mongoUri = config.mongodbUri;

if (!mongoUri) {
  throw new Error('MongoDB connection URI is not defined in environment variables');
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
