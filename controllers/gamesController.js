var request = require('request-promise-native');
const Game = require('../models/Game');
const User = require('../models/User');

module.exports = {
    showCategories,
    createGame,
    newQuestion,
    gameOver
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
    Game.findById(req.params.gameId, async function(err, game) {
        console.log(game);
        if (err) return res.status(400).json({err});
        var dupe = true;
        while (dupe) {
            // It's pausing the code until that promise is resolved - we turned this into a synchronous function
            var question = await request(`https://opentdb.com/api.php?amount=1&category=${game.categoryId}`)
            // check to see if this question is not already in the game.questions array
            question = JSON.parse(question);
            dupe = game.questions.some(q => q.text === question.results[0].question);
            if (!dupe) {
                game.questions.push({
                    text: question.results[0].question
                });
                game.save(function(err) {
                    res.status(200).json(question);
                });
            }
        }
    });
}

function gameOver(req, res) {
    res.render('games/gameover');
}

// async/await
// async function(params) {
//     try {
//         const random = await somethingModel.method();
//     } catch (error) {
//         console.log(error);
//     }
// }

