UpdateCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService', '$location', '$window'];
function UpdateCuentaController($scope, $routeParams, cuentaBancariaService, $location, $window) {

    $scope.cuentaBancaria = {};
    $scope.cuentaBancaria.idCuentaBancaria = $routeParams.idCuentaBancaria;
    $scope.tipo = "UPDATE";
    $scope.okBoton = "Actualizar";

    var response = cuentaBancariaService.get($routeParams.idCuentaBancaria);

    response.success(function (data, status, headers, config) {
        $scope.cuentaBancaria = data;
    });

    response.error(function (data, status, headers, config) {
        alert("Ha fallado la petición. Estado HTTP:" + status);
    });


    $scope.ok = function () {
        var response = cuentaBancariaService.update($scope.cuentaBancaria);

        response.success(function (data, status, headers, config) {
            alert("Actualizado con Éxito la cuenta Bancaria: " + $scope.cuentaBancaria.idCuentaBancaria) + "\n Recargando...";
            $window.location.reload();
        });
        
        response.error(function (data, status, headers, config) {
            if (status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            } else {
                $scope.businessMessages = data;
            }
        });
    };

    $scope.cancel = function () {
        $location.url('/findCuenta/');
    };
}
app.controller("UpdateCuentaController", UpdateCuentaController);
