app.config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider.when('/movimientos/:idCuentaBancaria', {
            templateUrl: "movimiento/getMovimiento-List.html",
            controller: "GetMovimientoController"
        });
        
        $routeProvider.when('/insertMovimiento/', {
            templateUrl: "movimiento/insert.html",
            controller: "InsertMovimientoController"
        });
        
}]);
        


