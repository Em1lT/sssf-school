// Controller
'use strict';
const catModel = require('../models/catModel');

const cat_list_get = async (req, res) => {
    const cats = await catModel.getAllCats();
    res.json(cats);
};

const cat_get = async (req, res) => {
    //let cat = cats.filter(cat => cat.id == req.params.id)
    const cat = await catModel.getCat(req.params.id);

    if (!cat) {
        res.json("No cat found with that id!");
    } else {
        res.json(cat);
    }
}

module.exports = {
    cat_list_get,
    cat_get
};