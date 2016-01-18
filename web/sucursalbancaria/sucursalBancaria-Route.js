app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/findSucursal', {
            templateUrl: "sucursalbancaria/sucursalBancaria-List.html",
            controller: "FindSucursalController"
        });

        $routeProvider.when('/insertSucursal/', {
            templateUrl: "sucursalbancaria/detail.html",
            controller: "InsertSucursalController"
        });

        $routeProvider.when('/updateSucursal/:idSucursalBancaria', {
            templateUrl: "sucursalbancaria/detail.html",
            controller: "UpdateSucursalController"
        });
    }]);