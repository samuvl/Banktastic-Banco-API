GetCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService', 'usuarioService', 'sucursalBancariaService', '$location'];

function GetCuentaController($scope, $routeParams, cuentaBancariaService, usuarioService, sucursalBancariaService, $location) {
    $scope.tipo = "GET";
    $scope.okBoton = "Obtener";

    usuarioService.find().then(function (result) {
        $scope.usuarios = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    sucursalBancariaService.find().then(function (result) {
        $scope.sucursalesBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    cuentaBancariaService.get($routeParams.idCuentaBancaria).then(function (result) {
        $scope.cuentaBancaria = result.data;
        $scope.cuentaBancaria.fechaCreacion = new Date($scope.cuentaBancaria.fechaCreacion);
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    $scope.cancel = function () {
        $location.url('/findCuenta/');
    };
}
app.controller("GetCuentaController", GetCuentaController);