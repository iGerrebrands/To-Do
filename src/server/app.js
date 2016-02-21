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
            password: { type: String, required: true },
            role: { type: String, required: true}
        });

        var todoSchema = mongoose.Schema({
            text: { type: String, required: true}
        });

        var User = mongoose.model('User', userSchema);
        var Todo = mongoose.model('Todo', todoSchema);

        var user = new User({ username: "ian10013", password: "password", role: "admin" });
        user.save();

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
            .post('/auth', function (req, res) {
                if (requestHandler.handler.validateRequest(requestHandler.handler.REQUEST.LOGIN, req.body, res)) {
                    var username = req.body.username;
                    var password = req.body.password;
                    User.find({username: username, password: password })
                        .exec( function (err, doc) {
                            if (doc.length > 0) {
                                var token = jwt.sign(doc[0], SERVER.SECRET, {
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
            })
            .post('/register', function (req, res) {
                if (requestHandler.handler.validateRequest(requestHandler.handler.REQUEST.REGISTER, req.body, res)) {
                    User.findOne({username: req.body.username})
                        .exec( function (err, doc) {
                            if (doc === null) {
                                if (req.body.password.length < 5) {
                                    res.json({
                                        accept: false,
                                        message: "Password must be at least 5 characters long"
                                    });
                                } else {
                                    if (req.body.password === req.body.passwordRepeat) {
                                        var regUser = new User({ username: req.body.username, password: req.body.password, role: "member" });
                                        regUser.save();
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
            })
            .get('/todo', function (req, res) {
                if (typeof req.query.type === String){
                    switch(req.query.type.toLowerCase()){
                        case "create":
                            if (requestHandler.handler.validateRequest(requestHandler.handler.REQUEST.CREATETODO, req.query, res)) {
                                var todo = new Todo({ text: req.query.text});
                                todo.save();
                                res.send("Todo Saved!");
                            }
                            break;
                        case "delete":
                            if (requestHandler.handler.validateRequest(requestHandler.handler.REQUEST.DELETETODO, req.query, res)) {
                                //TODO: Delete todo
                            }
                            break;
                        case "edit":
                            if (requestHandler.handler.validateRequest(requestHandler.handler.REQUEST.UPDATETODO, req.query, res)) {
                                //TODO: Update todo
                            }
                            break;
                        case "get":
                            if (requestHandler.handler.validateRequest(requestHandler.handler.REQUEST.GETTODO, req.query, res)) {
                                //TODO: Get todo
                            }
                            break;
                        default:
                            //TODO: Error message
                            break;
                    }
                }



            })
            .get('/data', function (req, res) {
                res.send("HELLO");
                if(req.query.id != undefined) {

                }
            });

        app.listen(SERVER.PORT, function () {
            console.log('Server running on port: ' + SERVER.PORT);
        });
    });