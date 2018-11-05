var request = require('request');
const Game = require('../models/Game');
const User = require('../models/User');

module.exports = {
    showCategories,
    createGame,
    newQuestion,
    removeQuestion
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
    Game.findById(req.params.gameId, function(err, questions) {
        fetch(`https://opentdb.com/api.php?amount=40&category=${catId}`)
        .then(request => request.json())
        .then()
        if (err) return res.status(400).json({err});
        res.status(200).json(questions);
    });
}

function removeQuestion(req, res, next) {
    Game.findByIdAndRemove(req.params.gameId, function(err, question) {
        if (err) return res.status(400).json({err});
        res.status(200).json({question});
    });
}

