const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    games: [{ type: Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('User', userSchmea);