GetMovimientoController.$inject = ['$scope', '$routeParams', 'movimientoService'];

function GetMovimientoController($scope, $routeParams, movimientoService) {

    movimientoService.getMovimiento($routeParams.idCuentaBancaria).then(function (result) {
        $scope.movimientos = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

}
app.controller("GetMovimientoController", GetMovimientoController);
