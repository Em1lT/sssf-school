const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catSchema = new Schema({
  name:  String,
  age: {
    type: Number,
    min: 0
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male' 
  } ,
  color: String,
  weight: Number
});

module.exports = mongoose.model('Cat', catSchema);