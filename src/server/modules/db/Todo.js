var db = require('./db');
var dbObject = require('./dbObject');

module.exports = dbObject(
    db.mongoose.model('Todo', db.mongoose.Schema({
        text: { type: String, required: true},
        user_id: { type: String, required: true}
    }))
);