const mongoose = require('mongoose');
const { Schema } = mongoose;

const model = new Schema({
  subject: String,
  catalog_nbr: String,
  review: String,
  hidden: Boolean,
  userName: String,
});

module.exports = mongoose.model('Review', model);
