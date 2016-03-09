var config = require('./modules/config');

var requestHandler = require('./modules/requests/requestHandler');
var db = require('./modules/db/db');

db.connect('mongodb://localhost:'+ config.SERVER.DBPORT +'/todo');

db.open( function() {
    requestHandler.registerBodyParser();
    requestHandler.registerRoutes();
    requestHandler.start(config.SERVER.PORT);
});