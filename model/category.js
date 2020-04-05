/*const animalCategory = [{
    id: 1,
    categoryName: 'Mammal',
}, ];*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryModel = new Schema({
    id: Number,
    categoryName: String,
});

module.exports = mongoose.model('category', categoryModel);