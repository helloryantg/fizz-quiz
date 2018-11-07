var request = require('request-promise-native');
const Game = require('../models/Game');
const User = require('../models/User');


module.exports = {
    newQuestion,
    incorrectAnswer,
}

function newQuestion(req, res) {
    Game.findById(req.params.gameId, async function(err, game) {
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

function incorrectAnswer(req, res) {
    Game.findById(req.params.gameId, function(err, game) {
        if (err) return res.status(400).json({err});
        var lastQuestion = game.questions[game.questions.length - 1];
        lastQuestion.numDrinks++;
        console.log(game.numDrinks);
        game.save(function(err) {
            res.status(200).json(lastQuestion);
        });
    });
}