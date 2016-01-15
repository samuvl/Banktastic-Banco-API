GetMovimientoController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService'];

function GetMovimientoController($scope, $routeParams, cuentaBancariaService) {
    $scope.tipo = "GETMOVIMIENTO";
    //$scope.idCuentaBancaria = $routeParams.idCuentaBancaria;


    cuentaBancariaService.getMovimiento($routeParams.idCuentaBancaria).then(function (result) {
        $scope.cuentasBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

}
app.controller("GetMovimientoController", GetMovimientoController);
