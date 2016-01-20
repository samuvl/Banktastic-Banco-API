FindSucursalController.$inject = ['$scope', '$routeParams', 'sucursalBancariaService', 'usuarioService'];

function FindSucursalController($scope, $routeParams, sucursalBancariaService, usuarioService) {
    $scope.tipo = "FIND";

    sucursalBancariaService.find().then(function (result) {
        $scope.sucursalesBancarias = result.data;
    }, function (result) {
        if (result.status === 403) {
            alert("Debes estar logeado para acceder a éste contenido.");
        } else {
            alert("Ha fallado la petición. Estado HTTP:" + result.status);
        }
    });

}
app.controller("FindSucursalController", FindSucursalController);
