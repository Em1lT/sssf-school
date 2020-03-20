'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const passport = require('./utils/pass');
const port = 3000;
const cats = require('./routes/catRouter')
const user = require('./routes/userRouter')
const authRoute = require('./routes/authRoute')
require('./controllers/authController');


app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/cat',passport.authenticate('jwt', {session: false}), cats)
app.use('/user',passport.authenticate('jwt', {session: false}), user)
app.use('/auth', authRoute)

app.get('/', (req, res) => {
  res.send('Home');
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
