var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csrfProtection = csrf();
//adding csrf protection to the route.
//this tells that all the routed included in this 'router' package must be protected by the csrf Protection.
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find((err, docs) => {
    var productChunks = [];
    var chunkSize = 3;
    for(var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  });
});

router.get('/user/signup', function(req, res, next) {
  //if possible error messages are present, get them.
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0}); 
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  //displays 'email already exists' message using connect-flash package.
  failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
  res.render('user/profile'); 
});



module.exports = router;
