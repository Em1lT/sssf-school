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
const app = express();

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

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./production')(app, process.env.PORT);
} else {
  require('./localhost')(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
}
