const mongoose = require('mongoose');

const { Schema } = mongoose;

const model = new Schema({
  name: String,
  description: String,
  coursesList: Array,
  public: Boolean,
});

module.exports = mongoose.model('CourseList', model);
