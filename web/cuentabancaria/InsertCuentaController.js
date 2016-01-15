InsertCuentaController.$inject = ['$scope', 'cuentaBancariaService', 'usuarioService', '$location', '$window'];
function InsertCuentaController($scope, cuentaBancariaService, usuarioService, $location, $window) {
    $scope.tipo = "INSERT";
    $scope.okBoton = "Insertar";
    $scope.cuentaBancaria = {};

    var response = usuarioService.find();

    response.success(function (data, status, headers, config) {
        $scope.usuarios = data;
    });

    response.error(function (data, status, headers, config) {
        alert("Ha fallado la petición GET usuarios. Estado HTTP:" + status);
    });

    $scope.ok = function () {

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