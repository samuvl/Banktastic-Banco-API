InsertMovimientoController.$inject = ['$scope', 'movimientoService', '$location', 'cuentaBancariaService'];

function InsertMovimientoController($scope, movimientoService, $location, cuentaBancariaService) {
    $scope.movimiento = {};

    $scope.ok = function () {
        movimientoService.insertMovimiento($scope.movimiento).then(function (result) {
            alert("Movimiento Insertado con Éxito");
        }, function (result) {
            if (result.status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + result.status);
            } else {
                $scope.businessMessages = result.data;
            }
        });
    };

    $scope.cancel = function () {
        $location.url('/findCuenta');
    };

}

app.controller("InsertMovimientoController", InsertMovimientoController);