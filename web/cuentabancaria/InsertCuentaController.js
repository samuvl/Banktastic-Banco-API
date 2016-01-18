InsertCuentaController.$inject = ['$scope', 'cuentaBancariaService', 'usuarioService', '$location', '$window'];
function InsertCuentaController($scope, cuentaBancariaService, usuarioService, $location, $window) {
    $scope.tipo = "INSERT";
    $scope.okBoton = "Insertar";
    $scope.cuentaBancaria = {};


    usuarioService.find().then(function (result) {
        $scope.usuarios = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    $scope.ok = function () {
        
        cuentaBancariaService.insert($scope.cuentaBancaria).then(function (result) {
            alert("Cuenta Insertada con Éxito con el nombre Titular: " + $scope.cuentaBancaria.numeroCuenta);
            $location.url("/findCuenta");
        }, function (result) {
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