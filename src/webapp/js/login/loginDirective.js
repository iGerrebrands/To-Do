(function (){
    angular
        .module('todoApp')
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
                                $location.path("/test");
                            })
                            .catch(function (response) {
                                switch(response.status){
                                    case 401:
                                        scope.message = "Invalid credentials!";
                                        break;
                                    case -1:
                                        scope.message = "There is something wrong with the connection!";
                                        break;
                                    default:
                                        scope.message = "There is something wrong please contact a administrator!";
                                        break;
                                }
                                // console.log(response);
                                // TODO: HANDLE ERROR console.log(response.status);
                            });
                        }
                    }
                }
            }]
        );
})();