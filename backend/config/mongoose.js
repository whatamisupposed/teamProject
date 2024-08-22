const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb+srv://marceluswork:EfHQz2FfDvgPFAOI@student-registry.7ayse6a.mongodb.net/';

mongoose.connect(dbURI, {
  tls: true,
  tlsInsecure: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;



