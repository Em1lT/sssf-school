const express = require('express');
const router = express.Router();


const chargeController = require('../controllers/chargeController');

router.get('/', chargeController.charge_list_get);

router.post('/', async (req, res) => {
    res.send("With this endpoint you can post chargemap");    
  })

router.put('/', (req, res) => {
    res.send('With this endpoint you can edit chargemap.');
});


router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete chargemap.');
});

router.get('/:id', chargeController.charge_get);

module.exports = router