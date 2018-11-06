const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    text: String,
    numDrinks: {
        type: Number,
        default: 0
    }
});

const gameSchema = new Schema({
    categoryId: Number,
    questions: [questionSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Game', gameSchema);
