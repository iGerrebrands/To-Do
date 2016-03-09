var mongoose = require('mongoose');
var config = require('../config');

module.exports = {
    mongoose: mongoose,
    db: null,
    connect: function (url) {
        this.mongoose.connect(url);
        this.db = this.mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
    },
    open: function (callback){
        this.db.once('open', callback);
        console.log("Connected to DB on port:" + config.SERVER.DBPORT);
    }
};