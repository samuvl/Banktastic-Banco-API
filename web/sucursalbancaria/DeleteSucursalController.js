DeleteSucursalController.$inject = ['$scope', '$routeParams', 'sucursalBancariaService', 'entidadBancariaService', '$location'];

function DeleteSucursalController($scope, $routeParams, sucursalBancariaService, entidadBancariaService, $location) {
    $scope.sucursalBancaria = {};
    $scope.idSucursalBancaria = $routeParams.idSucursalBancaria;
    $scope.tipo = "DELETE";
    $scope.okBoton = "Borrar";

    entidadBancariaService.find().then(function (result) {
        $scope.entidadesBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    sucursalBancariaService.get($routeParams.idSucursalBancaria).then(function (result) {
        $scope.sucursalBancaria = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    $scope.ok = function () {

        sucursalBancariaService.delete($routeParams.idSucursalBancaria).then(function (result) {
            alert("Borrado Con Éxito");
            $location.url('/findSucursal');
        }, function (result) {
            alert("Ha fallado la petición. Estado HTTP:" + result.status);
        });
    };

    $scope.cancel = function () {
        $location.url('/findSucursal');
    };
}

app.controller("DeleteSucursalController", DeleteSucursalController);
