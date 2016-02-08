(function () {
    angular
        .module('todo-app', [
            'ngRoute'
        ])
        .config(['$routeProvider', function (
            $routeProvider
        ) {
            $routeProvider
                .when('/', {
                    templateUrl: 'build/js/login/loginView.html',
                    access: {
                        required: {
                            login: false
                        }
                    }
                })
                .when('/register', {
                    templateUrl: 'build/js/register/registerView.html',
                    access: {
                        required: {
                            login: false
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);
})();