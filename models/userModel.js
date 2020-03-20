'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM wop_user');
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

const getUserLogin = async (params) => {
    try {
        console.log("params::" + params);
        const [rows] = await promisePool.execute(
            'SELECT * FROM wop_user WHERE email = ?;',
            params);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

const getUserById = async (id) => {
    try {
        const [user] = await promisePool.query('SELECT * FROM wop_user WHERE user_id = ' + id);

        delete user[0].password;
        return user;
    } catch (e) {
        console.log('error', e.message);
    }
}

const addUser = async (user) => {
    try {
        await promisePool.query('INSERT INTO wop_user (name, email, password) VALUES ("' + user.name + '", "' + user.email + '", "' + user.passwd + '")');
        return true;
    } catch (e) {
        console.log('error', e.message);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    getUserLogin
};