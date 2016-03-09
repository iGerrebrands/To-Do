var express = require('express');
var bodyParser = require('body-parser');

module.exports = {
    app: express(),
    registerBodyParser: function () {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    },
    registerRoutes: function (){
        this.app.get('/', require('./routes/default'));
        this.app.post('/auth', require('./routes/auth'));
        this.app.post('/register', require('./routes/register'));

        this.app.get('/todo/:id/:userid', require('./routes/todo/todoGet'));
        this.app.post('/todo/create', require('./routes/todo/todoCreate'));
        this.app.post('/todo/delete', require('./routes/todo/todoDelete'));
        this.app.post('/todo/update', require('./routes/todo/todoUpdate'));
    },
    start: function (port) {
        this.app.listen(port, function () {
            console.log('Server running on port: ' + port);
        });
    }
};