app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/findSucursal', {
            templateUrl: "sucursalbancaria/sucursalBancaria-List.html",
            controller: "FindSucursalController"
        });
              
        $routeProvider.when('/getSucursal/:idSucursalBancaria', {
            templateUrl: "sucursalbancaria/detail.html",
            controller: "GetSucursalController"
        });

        $routeProvider.when('/deleteSucursal/:idSucursalBancaria', {
            templateUrl: "sucursalbancaria/detail.html",
            controller: "DeleteSucursalController"
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