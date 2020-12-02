const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const model = new Schema({
  email: String,
  username: String,
  password: String,
  deactivated: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

model.methods.generateJWTToken = () => {
  //we can later add expires in other option as need and other things like secret string
  const token = jwt.sign(
    { username: this.username, isAdmin: this.isAdmin },
    'secret'
  );
  return token;
};

module.exports = mongoose.model('User', model);
