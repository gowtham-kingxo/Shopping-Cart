//already imported passport and initialised in app.js, so here we only need to import
var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

//store user in server with id. done is called by passport package.
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//retrieve the user with the user id.
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    
    //validating email and password using express-validator.
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 4});

    //To get the errors from the above code thrown by validator.
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg); 
        });

        //Adding the error messages manually to the flash middleware.
        return done(null, false, req.flash('error', messages));
    }
    
    User.findOne({'email': email}, function(err, user) {
        //findOne gives an error.
        if (err) {
            return done(err);
        }
        //findOne retrieves the user.
        if (user) {
            return done(null, false, {message: 'Email already exists.'});
        }
        //else no error and user does not exist in th database.
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
            if(err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });

}));