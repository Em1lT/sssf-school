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

const getUserById = async (id) => {
    try {
        const [user] = await promisePool.query('SELECT * FROM wop_user WHERE user_id = ' + id);
        return user;
    } catch (e) {
        console.log('error', e.message);
    }
}

module.exports = {
    getAllUsers,
    getUserById
};