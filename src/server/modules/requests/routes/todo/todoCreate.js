var requestValidator = require('../../requestValidator');
var todo = require('../../../db/Todo');

module.exports = function (req, res) {
    console.log(req.body);
    if (requestValidator.validateRequest(requestValidator.REQUEST.CREATETODO, req.body, res)) {
        todo.save({
            text: req.body.text,
            user_id: req.body.id
        }, function (err) {

        });
        res.json({
            successful: true,
            message: 'Created successfully.'
        });
    } else {
        res.json({
            successful: false,
            message: 'Something went wrong.'
        });
    }
};