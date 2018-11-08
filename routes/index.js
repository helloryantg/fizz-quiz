var express = require('express');
var router = express.Router();
var passport = require('passport');
var gamesCtrl = require('../controllers/gamesController');

router.get('/', function (req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google', {
    successRedirect: '/category',
    failureRedirect: '/'
  }
));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/category', isLoggedIn, gamesCtrl.showCategories);
router.get('/instructions', gamesCtrl.showInstructions);
router.get('/category/:catId', isLoggedIn, gamesCtrl.createGame);
router.get('/gameover/:gameId', isLoggedIn, gamesCtrl.gameOver);
router.get('/settings', gamesCtrl.settings);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;
