'use strict';

require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const ChargeSchema = require('./schema/chargeSchema');
const connectionModel = require('./model/connection');

const db = require('./module/db')
const app = express();

const auth = (req, res, next) => {
    req.user = true;
    next();
};

const checkAuth = (req, res) => {
    console.log('user', req.user);
    if (!req.user)
        throw new Error('Not authenticated');
};

app.use(auth);


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
    '/graphql',
    graphqlHTTP({
        schema: ChargeSchema,
        graphiql: true,
    })
)


console.log("Graphql started!")
console.log("Graphql1 started!")

app.listen(3000);