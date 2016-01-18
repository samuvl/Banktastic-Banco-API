UpdateCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService', 'usuarioService', '$location', '$window'];
function UpdateCuentaController($scope, $routeParams, cuentaBancariaService, usuarioService, $location, $window) {

    $scope.cuentaBancaria = {};
    $scope.cuentaBancaria.idCuentaBancaria = $routeParams.idCuentaBancaria;
    $scope.tipo = "UPDATE";
    $scope.okBoton = "Actualizar";


    usuarioService.find().then(function (result) {
        $scope.usuarios = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    cuentaBancariaService.get($routeParams.idCuentaBancaria).then(function (result) {
        $scope.cuentaBancaria = result.data;
        //$scope.cuentaBancaria.fechaCreacion = new Date($scope.cuentaBancaria.fechaCreacion);
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    $scope.ok = function () {
        cuentaBancariaService.update($scope.cuentaBancaria).then(function (result) {
            alert("Actualizado con Éxito la cuenta Bancaria: " + $scope.cuentaBancaria.numeroCuenta) + "\n Recargando...";
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
