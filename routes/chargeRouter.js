const express = require('express');
const router = express.Router();
const passport = require('passport');


const chargeController = require('../controllers/chargeController');

router.get('/', chargeController.charge_list_get);

router.post('/', passport.authenticate('jwt', {session: false}), chargeController.charge_post);

router.put('/', passport.authenticate('jwt', {session: false}),  (req, res) => {
    res.send('With this endpoint you can edit chargemap.');
});


router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete chargemap.');
});

router.get('/:id', chargeController.charge_get);

module.exports = router