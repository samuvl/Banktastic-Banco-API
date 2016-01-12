InsertCuentaController.$inject = ['$scope', 'cuentaBancariaService', '$location', '$window'];
function InsertCuentaController($scope, cuentaBancariaService, $location, $window) {
    $scope.tipo = "INSERT";
    $scope.okBoton = "Insertar";
    $scope.cuentaBancaria = {};

    $scope.ok = function () {
        alert(cuentaBancaria.saldoCuenta);
        var response = cuentaBancariaService.insert($scope.cuentaBancaria);

        response.success(function (data, status, headers, config) {
            alert("Cuenta Insertada con Éxito con el nombre Titular: " + $scope.cuentaBancaria.nombreTitular);
            $location.url("/findCuenta");
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
        $location.url('/');
    };

}
app.controller("InsertCuentaController", InsertCuentaController);