var requestValidator = require('../../requestValidator');
var todo = require('../../../db/Todo');

module.exports = function (req, res) {
    if (requestValidator.validateRequest(requestValidator.REQUEST.DELETETODO, req.body, res)) {
        todo.findOne({ _id: req.body.id }, function (err, doc){
            if(doc){
                doc.remove();
                res.json({
                    successful: true,
                    message: 'Removed successfully.'
                });
            } else {
                res.json({
                    successful: false,
                    message: 'This todo is does not exist!'
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