const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const model = new Schema({
  email: String,
  username: String,
  password: String,
  deactivated: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
});

model.methods.generateJWTToken = function () {
  const token = jwt.sign(
    { username: this.username, isAdmin: this.isAdmin },
    'secret',
    {
      algorithm: 'HS256',
      expiresIn: 86400,
    }
  );
  return token;
};

module.exports = mongoose.model('User', model);
