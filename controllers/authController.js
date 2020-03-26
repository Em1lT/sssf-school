'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userModel = require('../models/userModel')

const login = (req, res) => {
    console.log("req.body")
    console.log(req.body)

    passport.authenticate('local', { session: false }, (err, user) => {

        console.log("user")
        console.log(user)

        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, {
            session: false
        }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({
                user,
                token
            });
        });
    });
};

const register = async (req, res) => {
    const post = await userModel.create({
        username: req.body.name,
        password: req.body.password,
    })
    res.send("user added: " + req.body.username);
}

module.exports = {
    login,
    register
};