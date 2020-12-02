const mongoose = require('mongoose');

const { Schema } = mongoose;

const model = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  coursesList: { type: Array, required: true },
  public: { type: Boolean, default: false },
  lastEditedTime: { type: Date },
  userName: { type: String },
});

module.exports = mongoose.model('CourseList', model);
