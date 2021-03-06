module.exports = {
    REQUEST: {
        LOGIN: ['username', 'password'],
        REGISTER: ['username', 'password', 'passwordRepeat'],
        UPDATETODO: ['id', 'text'],
        CREATETODO: ['text','listid'],
        DELETETODO: ['id'],
        CREATETODOLIST: ['title'],
        DELETETODOLIST: ['id'],
        UPDATETODOLIST: ['id', 'title']
    },
    validateRequest: function (request, data, res) {
        for(var i=0; i<request.length; i++){
            if (!data.hasOwnProperty(request[i])) {
                res.status(400);
                return false;
            }
        }
        return true;
    }
};