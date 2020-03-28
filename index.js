'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const port = 3001;
const cats = require('./routes/catRouter');
const user = require('./routes/userRouter');
const authRoute = require('./routes/authRoute');
const charger = require('./routes/chargeRouter');
require('./controllers/authController');

const db = require('./module/db');

app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/cat', cats)
app.use('/user', user)
app.use('/charge', charger)
app.use('/auth', authRoute)

app.get('/', (req, res) => {
  res.send('Home');
});

db.on('connected', () => {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});


