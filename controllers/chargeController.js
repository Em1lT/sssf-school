// Controller
'use strict';
const chargeModel = require('../models/chargeModel')

const charge_list_get = async (req, res) => {
    res.json(await chargeModel.find());
};

const charge_get = async (req, res) => {

    res.json(await chargeModel.findById({
        id: req.params.id
    }));
}

const charge_get_within_coordinate = async (req, res) => {
    //Create here to search locations within geolocation
    //res.json(await chargeModel.find('location').within());
}
module.exports = {
    charge_list_get,
    charge_get,
    charge_get_within_coordinate
};