var requestValidator = require('../../requestValidator');
var todo = require('../../../db/Todo');

module.exports = function (req, res) {
    if (requestValidator.validateRequest(requestValidator.REQUEST.CREATETODO, req.body, res)) {
        todo.save({
            text: req.body.text,
            user_id: req.body.userid,
            list_id: req.body.listid
        }, function (err) {
            console.log(err);
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