app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/findCuenta', {
            templateUrl: "cuentabancaria/cuentaBancaria-List.html",
            controller: "FindCuentaController"
        });
        
//        $routeProvider.when('/getMovimiento/:idCuentaBancaria/movimientobancario', {
//            templateUrl: "cuentabancaria/cuentabancaria-List.html",
//            controller: "FindController"
//        });        
//        
        $routeProvider.when('/getCuenta/:idCuentaBancaria', {
            templateUrl: "cuentabancaria/detail.html",
            controller: "GetCuentaController"
        });

        $routeProvider.when('/deleteCuenta/:idCuentaBancaria', {
            templateUrl: "cuentabancaria/detail.html",
            controller: "DeleteCuentaController"
        });

        $routeProvider.when('/insertCuenta/', {
            templateUrl: "cuentabancaria/detail.html",
            controller: "InsertCuentaController"
        });

        $routeProvider.when('/updateCuenta/:idCuentaBancaria', {
            templateUrl: "cuentabancaria/detail.html",
            controller: "UpdateCuentaController"
        });
    }]);