// Controller
'use strict';

const stationModel = require('../models/station');
const connectionModel = require('../models/connection');
const connectionTypeModel = require('../models/connectionType')
const currentTypeModel = require('../models/currentType')
const levelTypeModel = require('../models/level')
const querystring = require('querystring');

const charge_list_get = async (req, res) => {

    if (req.query.topRight != undefined && req.query.bottomLeft != undefined && req.query.topLeft != undefined) {
        res.json(await charge_get_within_coordinate(req));
    } else {
        let response = await stationModel.find().populate({
            path: 'Connections',
            populate: [{
                    path: 'LevelID',
                },
                {
                    path: 'ConnectionTypeID'
                },
                {
                    path: 'CurrentTypeID'
                }
            ]
        }).limit(req.query.limit ? +req.query.limit : 10)


        res.json(response);
    }
};

const charge_get = async (req, res) => {

    res.json(await stationModel.findById({
        _id: req.params.id
    }).populate({
        path: 'Connections',
        populate: [{
                path: 'LevelID',
            },
            {
                path: 'ConnectionTypeID'
            },
            {
                path: 'CurrentTypeID'
            }
        ]
    }))
}

const charge_get_within_coordinate = async (req) => {
    const topRight = JSON.parse(req.query.topRight);
    const bottomLeft = JSON.parse(req.query.bottomLeft);
    const topLeft = JSON.parse(req.query.topLeft);


    const point = {
        type: 'Polygon',
        coordinates: [
            [
                [topRight.lng, topRight.lat],
                [bottomLeft.lng, bottomLeft.lat],
                [topLeft.lng, topLeft.lat],
                [topRight.lng, topRight.lat]
            ]
        ]
    }
    try {
        return await stationModel.find({}).where('Location').within(point).populate({
            path: 'Connections',
            populate: [{
                    path: 'LevelID',
                },
                {
                    path: 'ConnectionTypeID'
                },
                {
                    path: 'CurrentTypeID'
                }
            ]
        });
    } catch (e) {
        return e;
    }

    //Create here to search locations within geolocation
    //res.json(await chargeModel.find('location').within());
}

const charge_post = async (req, res) => {
    try {
        const ConnectionTypeID = await connectionTypeModel.create({
            FormalName: req.body.Connections.ConnectionType.FormalName,
            Title: req.body.Connections.ConnectionType.Title
        });

        const CurrentTypeID = await currentTypeModel.create({
            Description: req.body.Connections.CurrentType.Description,
            Title: req.body.Connections.CurrentType.Title,
        });

        const LevelTypeID = await levelTypeModel.create({
            Title: req.body.Connections.LevelType.Title,
            Comments: req.body.Connections.LevelType.Comments,
            IsFastChargeCapable: req.body.Connections.LevelType.IsFastChargeCapable
        });

        const connections = await connectionModel.create({
            ConnectionTypeID,
            CurrentTypeID,
            LevelTypeID,
            Quantity: req.body.Connections.Quantity
        })

        const station = await stationModel.create({
            Title: req.body.Title,
            Town: req.body.Town,
            AddressLine1: req.body.AddressLine1,
            StateOrProvince: req.body.StateOrProvince,
            Postcode: req.body.Postcode,
            Location: {
                type: "Point",
                coordinates: [req.body.Location.long, req.body.Location.lat],
            },
            Connections: connections

        })

        res.send("Adding station succesful")
    } catch (err) {
        res.sendStatus(500);
        console.log(err);
    }
}

const charge_remove = async (req, res) => {

    await stationModel.deleteOne({
        _id: req.params.id
    });
    res.sendStatus(200);
}

module.exports = {
    charge_list_get,
    charge_get,
    charge_post,
    charge_remove
};