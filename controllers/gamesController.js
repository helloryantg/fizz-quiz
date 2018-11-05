var request = require('request');

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