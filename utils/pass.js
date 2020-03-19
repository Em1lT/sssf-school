'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');

// fake database: ****************
const users = [
    {
      user_id: 1,
      name: 'Foo Bar',
      email: 'foo@bar.fi',
      password: 'foobar',
    },
    {
      user_id: 2,
      name: 'Bar Foo',
      email: 'bar@foo.fi',
      password: 'barfoo',
    },
  ];
 
// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
        const params = [username];
        try {
            const [user] = await userModel.getUserLogin(params);
            console.log('Local strategy', user); // result is binary row
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

module.exports = passport;