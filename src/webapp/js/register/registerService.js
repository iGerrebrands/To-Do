(function () {
    angular
        .module('todoApp')
        .service('registerService', ['$http', function (
            $http
        ) {
            this.validate = function (username, password, passwordRepeat) {
                if (typeof username === 'undefined' || typeof password === 'undefined' || typeof passwordRepeat === 'undefined'){
                    return {valid: false, message: "Fill in all fields!"};
                } else {
                    if (password === passwordRepeat) {
                        if (password.length < 5) {
                            return {valid: false, message: "Password must be at least 5 characters long!"};
                        } else {
                            return {valid: true, message: ""};
                        }
                    } else {
                        return {valid: false, message: "Passwords must be the same!"};
                    }
                }
            };

            this.send = function (data) {
                $http
                    .post("http://localhost:6005/register", data)
                    .then(function (val) {
                        console.log(val);
                    }, function (val) {
                        console.log(val);
                    });
            };
        }]);
})();