var express = require('express');
var router = express.Router();
var passport = require('passport');
var gamesCtrl = require('../controllers/gamesController');

const generalURL = 'https://opentdb.com/api.php?amount=1&category=9';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { user: req.user });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/category',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/category', gamesCtrl.showCategories);
router.get('/category/:catId', gamesCtrl.showQuestions);

module.exports = router;
