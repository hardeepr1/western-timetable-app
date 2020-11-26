const mongoose = require('mongoose');

const { Schema } = mongoose;

//course can have different schema
const model = new Schema({}, { strict: false });

module.exports = mongoose.model('Course', model);
