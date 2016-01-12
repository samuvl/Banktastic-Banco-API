DeleteCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService', '$location'];

function DeleteCuentaController($scope, $routeParams, cuentaBancariaService, $location) {
    $scope.cuentaBancaria = {};
    $scope.idCuentaBancaria = $routeParams.idCuentaBancaria;
    $scope.tipo = "DELETE";
    $scope.okBoton = "Borrar";

    var response = cuentaBancariaService.get($routeParams.idCuentaBancaria);
        response.success(function (data, status, headers, config) {
            $scope.cuentaBancaria = data;
        });

        response.error(function (data, status, headers, config) {
            alert("Ha fallado la petición. Estado HTTP:" + status);
        });

    $scope.ok = function () {

        var response = cuentaBancariaService.delete($routeParams.idCuentaBancaria);

        response.success(function (data, status, headers, config) {
            alert("Borrado Con Éxito");
            $location.url('/findCuenta');
        });
        response.error(function (data, status, headers, config) {
            alert("Error Borrando la Cuenta:  " + status);
        });
    };

    $scope.cancel = function () {
        $location.url('/findCuenta');
    };
}

app.controller("DeleteCuentaController", DeleteCuentaController);
