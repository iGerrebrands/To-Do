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
                            login: false,
                            roles: []
                        }
                    }
                })
                .when('/register', {
                    templateUrl: 'build/js/register/registerView.html',
                    access: {
                        required: {
                            login: false,
                            roles: []
                        }
                    }
                })
                .when('/test', {
                    templateUrl: 'build/js/register/registerView.html',
                    access: {
                        required: {
                            login: true,
                            roles: ['member', 'admin']
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
                        var role = $auth.getPayload()._doc.role;
                        if (current.$$route.access.required.roles.length !== 0 && !_.contains(current.$$route.access.required.roles, role)) {
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