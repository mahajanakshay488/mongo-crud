const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongocrud');

var userSchema = mongoose.Schema({
  title: String,
  heading: String,
  imageUrl: String,
  content: String
});

module.exports = mongoose.model('user', userSchema);