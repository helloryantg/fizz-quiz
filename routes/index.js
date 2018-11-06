var express = require('express');
var router = express.Router();
var passport = require('passport');
var gamesCtrl = require('../controllers/gamesController');

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

router.get('/category', isLoggedIn, gamesCtrl.showCategories);
router.get('/category/:catId', isLoggedIn, gamesCtrl.createGame);
router.get('/api/newQuestion/:gameId', gamesCtrl.newQuestion);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
