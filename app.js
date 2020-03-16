'use strict';
const express = require('express');
const app = express();
const port = 3000;
const cats = require('./routes/catRouter')

app.use('/cat', cats)

app.get('/', (req, res) => {
  res.send('Home');
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
