/*const animalData = [{
    id: 1,
    animalName: 'Frank',
    species: 1,
}, ];*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalModel = new Schema({
    id: Number,
    animalName: String,
    species: Number
});

module.exports = mongoose.model('animal', animalModel);