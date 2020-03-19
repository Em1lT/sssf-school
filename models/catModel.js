'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getCat = async (id) => {
  try {
    const [cat] = await promisePool.query('SELECT * FROM wop_cat WHERE cat_id = ' + id);
    return cat;
  } catch (e) {
    console.log('error', e.message);
  }
}

module.exports = {
  getAllCats,
  getCat
};