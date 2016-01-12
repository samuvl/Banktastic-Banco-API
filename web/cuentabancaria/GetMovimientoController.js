GetMovimientoController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService'];

function GetMovimientoController($scope, $routeParams, cuentaBancariaService) {
    $scope.tipo = "GETMOVIMIENTO";
    //$scope.idCuentaBancaria = $routeParams.idCuentaBancaria;

    var response = cuentaBancariaService.getMovimiento($routeParams.idCuentaBancaria);
    response.success(function (data, status, headers, config) {
        $scope.cuentasBancarias = data;
    });

}
app.controller("GetMovimientoController", GetMovimientoController);
