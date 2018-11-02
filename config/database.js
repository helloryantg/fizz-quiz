var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

mongoose.connection.once('open', function () {
    console.log(`Mongoose connect to: ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;