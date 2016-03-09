var dbObj = function (dbModule) {
    this.find = function (obj, callback) {
        return dbModule.find(obj, callback);
    };
    this.findOne = function (obj, callback) {
        return dbModule.findOne(obj, callback);
    };
    this.save = function (obj, callback){
        var requestedUser = new dbModule(obj);
        requestedUser.save(callback);
    };
};

module.exports = function (dbModule) {
    return new dbObj(dbModule);
};