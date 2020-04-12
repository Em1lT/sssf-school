'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../model/userModel');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');


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
        try {
            const user = await userModel.findOne({
                name: username
            })

            if (user === undefined) {

                return done(null, false, {
                    message: 'Incorrect username'
                });
            }
            let pass = await bcrypt.compareSync(password, user.password)
            if (!pass) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            let newUser = {
                _id: user._id,
                name: user.name
            }
            return done(null, {
                ...newUser
            }, {
                message: 'Logged In Successfully'
            }); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            return done(err);
        }
    }));

// TODO: JWT strategy for handling bearer token
passport.use(new JWTStrategy ({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, async (jwtPayload, done) => {
    const user = await userModel.findOne({
        name: jwtPayload
    })
    if(user == undefined) {
        return done(err);
    }

    return done(null, user)
}));

module.exports = passport;