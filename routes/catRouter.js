const express = require('express');
const router = express.Router();
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({
    storage: storage
})

const catController = require('../controllers/catController');

router.get('/', catController.cat_list_get);


router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    console.log(req.file);
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
  })

router.put('/', (req, res) => {
    res.send('With this endpoint you can edit cats.');
});


router.delete('/', (req, res) => {
    res.send('With this endpoint you can delete cats.');
});

router.get('/:id', catController.cat_get);

module.exports = router