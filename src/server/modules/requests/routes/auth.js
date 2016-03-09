var config = require('../../config');
var requestValidator = require('../requestValidator');
var jwt = require('jsonwebtoken');
var user = require('../../db/User');

module.exports = function (req, res) {
        if (requestValidator.validateRequest(requestValidator.REQUEST.LOGIN, req.body, res)) {
            var username = req.body.username;
            var password = req.body.password;
            //TODO: Refactore use findOne
            user.find({username: username, password: password })
                .exec( function (err, doc) {
                    if (doc.length > 0) {
                        var token = jwt.sign(doc[0], config.SERVER.SECRET, {
                            expiresIn: 7200
                        });
                        res.json({
                            success: true,
                            message: 'Login successful!',
                            token: token
                        });
                    } else {
                        res.statusCode = 401;
                        res.send();
                    }
                });
        }
    };