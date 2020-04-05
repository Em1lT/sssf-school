const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  ConnectionTypeID: {
    type: mongoose.ObjectId,
    ref: 'ConnectionType',
  },
  LevelID: {
    type: mongoose.ObjectId,
    ref: 'Level',
  },
  CurrentTypeID: {
    type: mongoose.ObjectId,
    ref: 'CurrentType',
  },
  Quantity: Number,
});

module.exports = mongoose.model('Connection', connectionSchema);