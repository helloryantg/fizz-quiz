var request = require('request');
const Game = require('../models/Game');
const User = require('../models/User');

module.exports = {
    showCategories,
    createGame,
    newQuestion
}

function showCategories(req, res) {
    res.render('games/categories');
};

function createGame(req, res) {
    var game = new Game({
        categoryId: req.params.catId,
        user: req.user
    });
    game.save(function(err) {
        res.render('games/main', {gameId: game._id});
    });
};

function newQuestion(req, res) {
    Game.findById({id: req.params.gameId}), function(err, questions) {
        if (err) return res.status(400).json(err);
        res.json(questions);
    }
}

