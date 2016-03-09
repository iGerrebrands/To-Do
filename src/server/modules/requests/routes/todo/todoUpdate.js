var requestValidator = require('../../requestValidator');
var todo = require('../../../db/Todo');

module.exports = function (req, res) {
    if (requestValidator.validateRequest(requestValidator.REQUEST.UPDATETODO, req.body, res)) {
        todo.findOne({_id: req.body.id}, function (err, doc) {
            if (doc) {
                doc.text = req.body.text;
                doc.save(function (err){

                });
                res.json({
                    successful: true,
                    message: 'Updated',
                    todo: doc
                });
            } else {
                res.json({
                    successful: false,
                    message: 'There is not todo with this id'
                });
            }
        });
    } else {
        res.json({
            successful: false,
            message: 'Something went wrong!'
        });
    }
};