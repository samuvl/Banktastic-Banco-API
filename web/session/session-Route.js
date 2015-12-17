app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login/', {
            templateUrl: "session/login.html",
            controller: "LoginController"
        });

        $routeProvider.when('/logout/', {
            templateUrl: "session/logout.html",
            controller: "LogoutController"
        });
    }]);