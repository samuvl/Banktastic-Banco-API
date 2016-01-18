UpdateSucursalController.$inject = ['$scope', '$routeParams', 'sucursalBancariaService', 'entidadBancariaService', '$location', '$window'];
function UpdateSucursalController($scope, $routeParams, sucursalBancariaService, entidadBancariaService, $location, $window) {

    $scope.sucursalBancaria = {};
    $scope.sucursalBancaria.idSucursalBancaria = $routeParams.idSucursalBancaria;
    $scope.tipo = "UPDATE";
    $scope.okBoton = "Actualizar";

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

    $scope.ok = function () {
        sucursalBancariaService.update($scope.sucursalBancaria).then(function (result) {
            alert("Actualizado con Éxito la cuenta Bancaria: " + $scope.sucursalBancaria.numeroCuenta) + "\n Recargando...";
            $window.location.reload();
        }, function (result) {
            if (status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            } else {
                $scope.businessMessages = result.data;
            }
        });

    };

    $scope.cancel = function () {
        $location.url('/findSucursal/');
    };
}
app.controller("UpdateSucursalController", UpdateSucursalController);
