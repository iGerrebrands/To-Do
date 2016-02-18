exports.handler = {
    version: "0.0.1",
    REQUEST: {
        LOGIN: ["username", "password"],
        REGISTER: ["username", "password", "passwordRepeat"],
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