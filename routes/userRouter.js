const express = require('express');
const router = express.Router();



router.get('/:id', (req, res) => {
    res.send('With this endpoint you can list one users');
});

router.get('/', (req, res) => {
    res.send('With this endpoint you can list all users');
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('With this endpoint you can list all users');
});

router.delete('/', (req, res) => {
    res.send('delete password');
});

module.exports = router