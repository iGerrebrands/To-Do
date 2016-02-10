(function () {
    angular
        .module('todo-app', [
            'ngRoute',
            'satellizer'
        ])
        .config(['$routeProvider', '$authProvider', function (
            $routeProvider,
            $authProvider
        ) {
            $authProvider.loginUrl = 'http://localhost:6005/auth';
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
                            login: true
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
        }])
        .run(['$location', '$rootScope', '$auth', function (
            $location,
            $rootScope,
            $auth
        ) {
            $rootScope.$on('$routeChangeSuccess', function (event, current) {
                if (current.$$route && current.$$route.access) {
                    if ($auth.isAuthenticated()) {

                        //var role = $auth.getPayload().roles[0];
                        var role = "role";
                        if (current.$$route.access.required.role !== role) {
                            $location.path('/');
                        }
                    } else {
                        if (current.$$route.access.required.login) {
                            $location.path('/');
                        }
                    }
                }
            });
        }]);
})();