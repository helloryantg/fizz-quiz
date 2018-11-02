const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    questionCount: Number,
    correctCount: Number
}, {
        timestamps: true
    });

module.exports = mongoose.model('Game', gameSchema);