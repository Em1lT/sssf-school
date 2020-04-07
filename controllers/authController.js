'use strict';
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 8;

const login = async (req, res) => {
    console.log(req.body)
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
    const hashPass = await bcrypt.hashSync(req.body.password, saltRounds);
    const post = await userModel.create({
        name: req.body.name,
        password: hashPass,
    })
    res.send("user added: " + req.body.name);
}

module.exports = {
    login,
    register
};