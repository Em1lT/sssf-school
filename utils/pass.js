'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser(function (user, done) {
    console.log('Serialize user called.');
    done(null, user.name);
});

passport.deserializeUser(function (id, done) {
    console.log('Deserialize user called.');
    return done(null, {
        name: 'Oliver'
    });
});

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
        console.log('Local strategy: ', user); // result is binary row

        console.log("username");
        console.log("password");

        try {
            console.log("username")
            const [user] = await userModel.findOne({
                name: username
            })

            console.log('Local strategy: ', user); // result is binary row
            if (user === undefined) {

                return done(null, false, {
                    message: 'Incorrect email.'
                });
            }
            if (user.password !== password) {

                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }

            return done(null, {
                ...user
            }, {
                message: 'Logged In Successfully'
            }); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            return done(err);
        }
    }));

// TODO: JWT strategy for handling bearer token
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, (jwtPayload, done) => {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return userModel.getUserById(jwtPayload.user_id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
}));

module.exports = passport;