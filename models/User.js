const mongoose = require('mongoose');

const { Schema } = mongoose;

const model = new Schema({
  email: String,
  username: String,
  password: String,
  deactivated: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', model);
