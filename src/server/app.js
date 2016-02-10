var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var requestHandler = require('./modules/requestHandler');

var SERVER = {
  PORT: 6005
};
//egui
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    .post('/auth', function (req, res) {
        if (requestHandler.handler.validateLogin(req.body.username, req.body.password)) {
            var token = jwt.sign({
                id: 12,
                name: "Ian",
                klas: "3J"
            }, "J2A23rHF", {
                expiresInMinutes: 240 // expires in 4 hours
            });
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }

        //res.json({ success: false, message: 'Authentication failed. User not found.' });

    })
    .get('/data', function (req, res) {
        if(req.query.id != undefined) {

        }
    });

app.listen(SERVER.PORT, function () {
    console.log('Server running on port: ' + SERVER.PORT);
});