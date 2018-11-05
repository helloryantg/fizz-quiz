const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    text: String,
    correct: Boolean
})

const gameSchema = new Schema({
    questionCount: Number,
    correctCount: Number,
    questions: [questionSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Game', gameSchema);