FindSucursalController.$inject = ['$scope', '$routeParams', 'sucursalBancariaService', 'usuarioService'];

function FindSucursalController($scope, $routeParams, sucursalBancariaService, usuarioService) {
    $scope.tipo = "FIND";

    sucursalBancariaService.find().then(function (result) {
        $scope.sucursalesBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

}
app.controller("FindSucursalController", FindSucursalController);
