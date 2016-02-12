exports.handler = {
    version: "0.0.1",
    //REQUEST CONSTANT WITH ARRAY OF REQUIRED DATA
    REQUEST: {
        LOGIN: ["username", "password"],
        REGISTER: ["username", "password"],
        CREATETODO: ["title", "text"]
    },
    validateRequest: function (request, data, res) {
        for(var i=0; i<request.length; i++){
            if (!data.hasOwnProperty(request[i])) {
                res.status(400);
                return false;
            }
        }
        return true;
    },
    validateLogin: function (User, username, password) {
        return User.find({username: username, password: password });
    },
    register: function(userData) {
        return true;
    },
    createToDo: function (toDoData) {
        return true;
    },
    updateToDo: function (id, toDoData) {
        return true;
    },
    deleteToDo: function (id) {
        return true;
    }
};