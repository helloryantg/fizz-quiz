var request = require('request');
const Game = require('../models/Game');
const User = require('../models/User');

module.exports = {
    showCategories,
    showQuestions
}

function showCategories(req, res) {
    res.render('games/categories');
};

function showQuestions(req, res) {
    res.render('games/main', {catId: req.params.catId});
};