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

module.exports = {
    user_list_get,
    user_get
};