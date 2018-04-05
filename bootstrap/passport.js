/* global Models, logger */

import passport from 'passport';
import LocalStrategy from 'passport-local';
import TMJStrategy from 'tmj-passport';
export default () => {
    let User = new Models('User');
    
    // Local Passport
   
    passport.use(new TMJStrategy({
        apiToken: '12345',
        url: 'https://be-talk-dev.tmjp.jp/api/login',
        usernameField: 'username',
        passwordField: 'password'
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

