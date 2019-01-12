var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
//adding csrf protection to the route.
//this tells that all the routed included in this 'router' package must be protected by the csrf Protection.
router.use(csrfProtection);

 //isLoggedIn - no parenthesis, it's just a reference.
 router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile'); 
  });

  router.get('/logout', isLoggedIn, function(req, res, next) {
    //method of passport. 
    req.logOut();
    res.redirect('/');
  });

router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

router.get('/signup', function(req, res, next) {
    //if possible error messages are present, get them.
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0}); 
  });
  
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    //displays 'email already exists' message using connect-flash package.
    failureFlash: true
  }));
  
  
  router.get('/signin', function(req, res, next) {
    //if possible error messages are present, get them.
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0}); 
  });
  
  router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    //displays 'email already exists' message using connect-flash package.
    failureFlash: true
  }));

  


  module.exports = router;

  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      }
      res.redirect('/'); 
  }

  function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/'); 
}