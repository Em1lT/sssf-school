const express = require('express');
const router = express.Router();
const multer = require('multer')
const catController = require('../controllers/catController');

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

router.get('/', catController.cat_list_get);


router.post('/', upload.single('cat'), catController.add_cat)

router.put('/', (req, res) => {
    res.send('With this endpoint you can edit cats.');
});


router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete cats.');
});

router.get('/:id', catController.cat_get);

module.exports = router