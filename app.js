'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const cats = require('./routes/catRouter')
const user = require('./routes/userRouter')

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use('/cat', cats)
app.use('/user', user)

app.get('/', (req, res) => {
  res.send('Home');
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
