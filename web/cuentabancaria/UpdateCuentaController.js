UpdateCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService', '$location', '$window'];
function UpdateCuentaController($scope, $routeParams, cuentaBancariaService, $location, $window) {

    $scope.cuentaBancaria = {};
    $scope.cuentaBancaria.idCuentaBancaria = $routeParams.idCuentaBancaria;
    $scope.tipo = "UPDATE";
    $scope.okBoton = "Actualizar";
//Cargar Usuarios:
    usuarioService.find().then(function (result) {
        $scope.usuarios = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });
//Cargar 
    cuentaBancariaService.get($routeParams.idCuentaBancaria).then(function (result) {
        $scope.cuentaBancaria = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    $scope.ok = function () {

        cuentaBancariaService.update($scope.cuentaBancaria).then(function (result) {
            alert("Actualizado con Éxito la cuenta Bancaria: " + $scope.cuentaBancaria.nCuenta) + "\n Recargando...";
            $window.location.reload();
        }, function (result) {
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
