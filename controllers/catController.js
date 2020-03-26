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

    res.json(await catModel.find({}));
}

const add_cat = async (req, res) => {
    const post = await catModel.create({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        color: req.body.color,
        weight: req.body.weight
    })
    res.send("With this endpoint you can post cats." + post.name);
}

module.exports = {
    cat_list_get,
    cat_get,
    add_cat
};