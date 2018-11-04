// const passport = require('passport')
// const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

// expose this function to our app using module.exports
module.exports = function (passport) {


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true, // allows us to pass back the entire request to the callback
            // session: false,

        },
        function (req, email, password, done) { // callback with email and password from our form
            // console.log(req);
            console.log(`${email}:${password}`);

            var fakeUser = {
                username: email,
                name: email,
                id: 1,
            }
            // all is well, return successful user
            return done(null, fakeUser);

            // // find a user whose email is the same as the forms email
            // // we are checking to see if the user trying to login already exists
            // User.findOne({ 'local.email' :  email }, function(err, user) {
            //     // if there are any errors, return the error before anything else
            //     if (err)
            //         return done(err);

            //     // if no user is found, return the message
            //     if (!user)
            //         return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            //     // if the user is found but the password is wrong
            //     if (!user.validPassword(password))
            //         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            //     // all is well, return successful user
            //     return done(null, user);
            // });

        }));


};