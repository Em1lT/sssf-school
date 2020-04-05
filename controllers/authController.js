'use strict';
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')

const login = async (req, res) => {
    const user = await userModel.findOne({
        name: req.body.username
    })
    const token = jwt.sign(req.body.username, 'your_jwt_secret');
    return res.json({
        user,
        token
    });
};

const register = async (req, res) => {
    const post = await userModel.create({
        name: req.body.name,
        password: req.body.password,
    })
    res.send("user added: " + req.body.name);
}

module.exports = {
    login,
    register
};