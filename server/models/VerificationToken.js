const mongoose = require('mongoose');

const { Schema } = mongoose;

const model = new Schema({
  email: String,
  verificationToken: String,
});

module.exports = mongoose.model('VerificationToken', model);
