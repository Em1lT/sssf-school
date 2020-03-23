// Controller
'use strict';
const catModel = require('../models/model')

const cats = catModel.cats;

const cat_list_get = async (req, res) => {

    if (Object.keys(req.query).length === 0) {
        res.json(await catModel.find({}));
    } else {
        res.json(await catModel.find().where('gender').equals(req.query.gender).where('weight').gt(req.query.weight).where('age').gt(req.query.age));
    }
};

const cat_get = async (req, res) => {
    console.log(req)
    console.log("here1");

    res.json(await catModel.find({}));
}

module.exports = {
    cat_list_get,
    cat_get
};