var db = require('./db');
var dbObject = require('./dbObject');

module.exports = dbObject(
    db.mongoose.model('User', db.mongoose.Schema({
        username: { type: String, required: true, index: { unique: true } },
        password: { type: String, required: true },
        role: { type: String, required: true }
    }))
);