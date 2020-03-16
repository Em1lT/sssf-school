// Controller
'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = (req, res) => {
  res.json(cats);
};
   
module.exports = {
  cat_list_get,
};