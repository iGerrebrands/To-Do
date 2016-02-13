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
                            scope.message = "OK";
                            registerService.send([
                                scope.username,
                                scope.password,
                                scope.passwordRepeat
                            ]);
                        } else {
                            scope.message = register.message;
                        }
                    };

                }
            }
        }]);
})();