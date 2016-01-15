GetCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService', 'usuarioService', '$location'];

function GetCuentaController($scope, $routeParams, cuentaBancariaService, usuarioService, $location) {
    $scope.tipo = "GET";
    $scope.okBoton = "Obtener";
//OPCION 1 - Una forma:
//    usuarioService.find().success(function (data, status, headers, config) {
//        $scope.usuarios = data;
//    }).error(function (data, status, headers, config) {
//        alert("Ha fallado la petición. Estado HTTP:" + status);
//    });
//    
//OPCION 2 - Forma ideal:    
    usuarioService.find().then(function (result) {
        $scope.usuarios = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });
// ----------------

    cuentaBancariaService.get($routeParams.idCuentaBancaria).then(function (result) {
        $scope.cuentaBancaria = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    $scope.cancel = function () {
        $location.url('/findCuenta/');
    };
}
app.controller("GetCuentaController", GetCuentaController);