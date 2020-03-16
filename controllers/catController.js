// Controller
'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = (req, res) => {
    res.json(cats);
};

const cat_get = (req, res) => {
    let cat = cats.filter(cat => cat.id == req.params.id)

    if (!cat.length) {
        res.json("No cat found with that id!");
    } else {
        res.json(cat);
    }
}

module.exports = {
    cat_list_get,
    cat_get
};