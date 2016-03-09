module.exports = function (req, res) {
    res.send(
        "ToDo API: <br>" +
        "/register <br>" +
        "/login <br>" +
        "/todo/create?title&text <br>" +
        "/todo/delete?id <br>" +
        "/todo/update?id&title&text <br>"
    );
};