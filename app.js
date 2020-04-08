'use strict';

require('dotenv').config();
const passport = require('passport');
const express = require('express');
const helmet = require('helmet');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const ChargeSchema = require('./schema/chargeSchema');
const bodyParser = require('body-parser');
const connectionModel = require('./model/connection');
const authRoute = require('./routes/authRoute');
const db = require('./module/db')
const app = express();
const bcrypt = require('bcrypt');

const auth = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user) =>{
        if (err || !user) {
            throw new Error('Not authenticated');
        }
    })(req, res)
};

const checkAuth = (req, res) => {
    console.log('user', req.user);
    if (!req.user)
        throw new Error('Not authenticated');
};

app.use(function(req, res, next) {
  if ((req.get('X-Forwarded-Proto') !== 'https')) {
    res.redirect('https://' + req.get('Host') + req.url);
  } else
    next();
});


//app.use(auth);
app.use(helmet());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/auth', authRoute);

/*test mongodb querys*/
app.use('/test', async (req, res) => {
    let test = await connectionModel.findById({
        _id: req.query.id
    })
    res.json(test);
})

app.use(
    '/graphql1', (req, res) => {
      graphqlHTTP({
        schema: MyGraphQLSchema,
        graphiql: true,
        context: {req, res, checkAuth},
      })(req, res);
    });


    app.use(
        '/graphql', (req, res) => {
          graphqlHTTP({
            schema: ChargeSchema,
            graphiql: true,
            context: {req, res, checkAuth},
          })(req, res);
        });

console.log("Graphql started: Charge Schema!")
console.log("Graphql1 started!: Animal Schema!")

app.listen(3000);