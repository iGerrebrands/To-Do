var express = require('express');
var app = express();
var requestHandler = require('./modules/requestHandler');

var SERVER = {
  PORT: 6005
};

app
    .get('/', function (req, res) {
        res.send(
            "ToDo API: <br>" +
            "/register <br>" +
            "/login <br>" +
            "/todo/create?title&text <br>" +
            "/todo/delete?id <br>" +
            "/todo/update?id&title&text <br>"
        );

    })
    .get('/register', function (req, res) {
        if (requestHandler.handler.validateRequest(requestHandler.handler.REQUEST.TODO, req.query, res)) {

        }
    })
    .get('/login', function (req, res) {
        if (requestHandler.handler.validateRequest(requestHandler.handler.REQUEST.LOGIN, req.query, res)) {
            if (requestHandler.handler.validateLogin(req.query.username, req.query.password)) {
                //TODO MAKE A COOKIE OR SOMETHING>>>>>>>
                res.json({
                    token: "grhbqyefbYUGbugEB23YH87FbwyuGF3fuI3H*yfgw",
                    userID: 1421
                });
            } else {
                res.status(401);
            }
        }
        res.send();
    })
    .get('/data', function (req, res) {
        if(req.query.id != undefined) {
            res.json({
                id: req.query.id,
                name: "Ian",
                klas: "3J"
            });
        }
    });

app.listen(SERVER.PORT, function () {
    console.log('Server running on port: ' + SERVER.PORT);
});