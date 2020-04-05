/*const speciesData = [
    {
      id: '1',
      speciesName: 'Cat',
      category: '1',
    },
  ];*/
 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpeciesModel = new Schema({
    id: Number,
    speciesName: String,
    category: Number
});

module.exports = mongoose.model('species', SpeciesModel);