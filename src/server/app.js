var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var requestHandler = require('./modules/requestHandler');

var SERVER = {
    PORT: 6005,
    SECRET: "J2A23rHF"
};

mongoose.connect('mongodb://localhost:27017/todo');

var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to DB");
        var userSchema = mongoose.Schema({
            username: { type: String, required: true, index: { unique: true } },
            password: { type: String, required: true }
        });

        var User = mongoose.model('User', userSchema);

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
                    //var user = new User({ username: req.query.username, password: req.query.password });
                    //user.save(function (err) {
                    //    if (err) return handleError(err);
                    //    // saved!
                    //});
                }
            })
            .post('/auth', function (req, res) {
                var username = req.body.username;
                var password = req.body.password;
                requestHandler.handler.validateLogin(User, username, password).exec( function (err, doc) {
                    if (doc.length > 0) {
                        var token = jwt.sign(doc[0], SERVER.SECRET, {
                            expiresInMinutes: 240
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
            })
            .get('/data', function (req, res) {
                if(req.query.id != undefined) {

                }
            });

        app.listen(SERVER.PORT, function () {
            console.log('Server running on port: ' + SERVER.PORT);
        });
    });