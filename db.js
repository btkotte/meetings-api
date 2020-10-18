var mongoose = require('mongoose');

var dbUrl = process.env.DBURL || 'mongodb://127.0.0.1:27017/meetings-db';

mongoose.connect(dbUrl, { useMongoClient: true }, function (err) {

    if (err) {
        console.log("Error connecting to the DB Url: " + dbUrl);
        throw err;
    }
});