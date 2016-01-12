GetCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService', '$location'];

function GetCuentaController($scope, $routeParams, cuentaBancariaService, $location) {
    $scope.tipo = "GET";
    $scope.okBoton = "Obtener";
    var response = cuentaBancariaService.get($routeParams.idCuentaBancaria);

    response.success(function (data, status, headers, config) {
        $scope.cuentaBancaria = data;
    });

    $scope.cancel = function () {
        $location.url('/findCuenta/');
    };
}
app.controller("GetCuentaController", GetCuentaController);