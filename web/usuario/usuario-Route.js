app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/findUser/', {
            templateUrl: "usuario/usuario-List.html",
            controller: "FindUserController"
        });

        $routeProvider.when('/findUser/:nombre', {
            templateUrl: "usuario/usuario-List.html",
            controller: "FindUserController"
        });
//
//        $routeProvider.when('/getUser/:idUsuario', {
//            templateUrl: "usuario/detail.html",
//            controller: "GetUserController"
//        });
//
//        $routeProvider.when('/deleteUser/:idUsuario', {
//            templateUrl: "usuario/detail.html",
//            controller: "DeleteUserController"
//        });

        $routeProvider.when('/insertUser/', {
            templateUrl: "usuario/detail.html",
            controller: "InsertUserController"
        });

        $routeProvider.when('/updateUser/:idUsuario', {
            templateUrl: "usuario/detail.html",
            controller: "UpdateUserController"
        });
    }]);