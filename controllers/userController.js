'use strict';

let userModel = require('../models/userModel')

const user_list_get = async (req, res) => {
    const users = await userModel.getAllUsers();
    res.json(users);
}

const user_get = async (req, res) => {
    const user = await userModel.getUserById(req.params.id);

    if (user.length < 1) {
        res.json("No user found with that id!");
    } else {
        res.json(user);
    }
}

const user_create_post = async (req, res) => {
    let response = await userModel.addUser(req.body);
    res.json(response);
}

module.exports = {
    user_list_get,
    user_get,
    user_create_post
};