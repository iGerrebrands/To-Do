(function () {
    angular
        .module('todoApp')
        .directive('register', ['registerService', function (
            registerService
        ){
            return {
                templateUrl: 'build/js/register/registerFormView.html',
                link : function (scope) {
                    scope.register = function () {
                        var register = registerService.validate(scope.username, scope.password, scope.passwordRepeat);
                        if (register.valid) {
                            registerService.send({username: scope.username, password: scope.password, passwordRepeat: scope.passwordRepeat})
                                .then(function (val) {
                                    scope.message = val.data.message;
                                });
                        } else {
                            scope.message = register.message;
                        }
                    };

                }
            }
        }]);
})();