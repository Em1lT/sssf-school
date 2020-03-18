const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id',userController.user_get);

router.get('/', userController.user_list_get);

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('With this endpoint you can list all users');
});

router.delete('/', (req, res) => {
    res.send('delete password');
});

module.exports = router