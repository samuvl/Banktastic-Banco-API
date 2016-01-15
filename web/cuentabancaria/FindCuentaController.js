FindCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService', 'usuarioService'];

function FindCuentaController($scope, $routeParams, cuentaBancariaService, usuarioService) {
    $scope.tipo = "FIND";

    usuarioService.find().then(function (result) {
        $scope.usuarios = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    cuentaBancariaService.find().then(function (result) {
        $scope.cuentasBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

}
app.controller("FindCuentaController", FindCuentaController);
