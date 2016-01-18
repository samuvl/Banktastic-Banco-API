GetSucursalController.$inject = ['$scope', '$routeParams', 'sucursalBancariaService', 'entidadBancariaService', '$location'];

function GetSucursalController($scope, $routeParams, sucursalBancariaService, entidadBancariaService, $location) {
    $scope.tipo = "GET";
    $scope.okBoton = "Obtener";

    entidadBancariaService.find().then(function (result) {
        $scope.entidadesBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    sucursalBancariaService.get($routeParams.idSucursalBancaria).then(function (result) {
        $scope.sucursalBancaria = result.data;
        $scope.sucursalBancaria.fechaCreacion = new Date($scope.sucursalBancaria.fechaCreacion);
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    $scope.cancel = function () {
        $location.url('/findSucursal/');
    };
}
app.controller("GetSucursalController", GetSucursalController);