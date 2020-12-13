const mongoose = require('mongoose');
const { Schema } = mongoose;

const model = new Schema({
  subject: String,
  catalog_nbr: String,
  review: String,
  hidden: { type: Boolean, default: false },
  userName: String,
  reviewTime: { type: Date },
});

module.exports = mongoose.model('Review', model);
