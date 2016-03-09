var requestValidator = require('../requestValidator');
var user = require('../../db/User');

module.exports = function (req, res) {
        if (requestValidator.validateRequest(requestValidator.REQUEST.REGISTER, req.body, res)) {
            user.findOne({username: req.body.username})
                .exec( function (err, doc) {
                    if (doc === null) {
                        if (req.body.password.length < 5) {
                            res.json({
                                accept: false,
                                message: "Password must be at least 5 characters long"
                            });
                        } else {
                            if (req.body.password === req.body.passwordRepeat) {
                                user.save({ username: req.body.username, password: req.body.password, role: "member" }, function (err){

                                });
                                res.json({
                                    accept: true,
                                    message: "Registration successful"
                                });
                            } else {
                                res.json({
                                    accept: false,
                                    message: "Password is not matching with the repeat"
                                });
                            }
                        }
                    } else {
                        res.json({
                            accept: false,
                            message: "That username is already taken!"
                        });
                    }
            });
        }
    };