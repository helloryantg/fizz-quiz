var express = require('express');
var router = express.Router();
var gamesApiCtrl = require('../controllers/gamesApi');
var passport = require('passport');

router.get('/newQuestion/:gameId', isLoggedIn, gamesApiCtrl.newQuestion);
router.post('/incorrectAnswer/:gameId', isLoggedIn, gamesApiCtrl.incorrectAnswer);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;