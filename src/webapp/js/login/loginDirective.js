(function (){
    angular
        .module('todo-app')
        .directive('loginForm', ['$auth', '$location', function(
                $auth,
                $location
            ) {
                return {
                    templateUrl: 'build/js/login/loginFormView.html',
                    link: function (scope) {
                        scope.login = function () {
                            $auth.login({
                                username: scope.username,
                                password: scope.password
                            })
                            .then(function (response) {
                                console.log(response);
                                console.log($auth.getPayload()._doc.role);
                                $location.path("/test");
                            })
                            .catch(function (response) {
                                // TODO: HANDLE ERROR console.log(response.status);
                            });
                        }
                    }
                }
            }]
        );
})();