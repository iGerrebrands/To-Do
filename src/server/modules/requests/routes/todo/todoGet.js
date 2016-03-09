var todo = require('../../../db/Todo');

module.exports = function (req, res) {
    if (req.params.id) {
        todo.findOne({ _id: req.params.id, user_id: req.params.userid }, function (err, doc) {
            if (doc){
                res.json({
                    successful: true,
                    todo: doc
                });
            } else {
                res.json({
                    successful: false,
                    message: 'This todo is not available'
                });
            }

        });
    } else {
        todo.find({user_id: req.params.userid}, function (err, doc){
            if (doc.length > 0){
                res.json({
                    successful: true,
                    todos: doc
                });
            } else {
                res.json({
                    successful: false,
                    message: 'No todos found.'
                });
            }
        });
    }
};