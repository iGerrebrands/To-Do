(function (){
    angular
        .module('todo-app')
        .directive('loginForm', ['$auth', function(
                $auth
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
                                console.log($auth.getPayload());
                            })
                            .catch(function (response) {
                                console.log(response.status);
                            });
                        }
                    }
                }
            }]
        );
})();