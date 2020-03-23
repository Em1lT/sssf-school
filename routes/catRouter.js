const express = require('express');
const router = express.Router();
const multer = require('multer')
const catModel = require('../models/model')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, file.fieldname + '-' + Date.now() + '.'+ext);
    }
})

const upload = multer({
    storage: storage
})

const catController = require('../controllers/catController');

router.get('/', catController.cat_list_get);


router.post('/', upload.single('cat'), async (req, res) => {
    const post = await catModel.create({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        color: req.body.color,
        weight: req.body.weight
    })
    res.send("With this endpoint you can post cats." + post.name);    
  })

router.put('/', (req, res) => {
    res.send('With this endpoint you can edit cats.');
});


router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete cats.');
});

router.get('/:id', catController.cat_get);

module.exports = router