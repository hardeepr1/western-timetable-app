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

model.method.generateJWTToken = () => {
  //we can later add expires in other option as need
  const token = jwt.sign({ username: this.username, isAdmin: this.isAdmin });
};
module.exports = mongoose.model('User', model);
