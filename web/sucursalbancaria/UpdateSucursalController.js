UpdateSucursalController.$inject = ['$scope', '$routeParams', 'sucursalBancariaService', 'entidadBancariaService', 'cuentaBancariaService', '$location', '$window'];
function UpdateSucursalController($scope, $routeParams, sucursalBancariaService, entidadBancariaService, cuentaBancariaService, $location, $window) {

    $scope.sucursalBancaria = {};
    $scope.sucursalBancaria.idSucursalBancaria = $routeParams.idSucursalBancaria;
    $scope.tipo = "UPDATE";
    $scope.okBoton = "Actualizar";
    $scope.deleteBoton = "Borrar";

    entidadBancariaService.find().then(function (result) {
        $scope.entidadesBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    cuentaBancariaService.findCuentaBySucursal($scope.sucursalBancaria.idSucursalBancaria).then(function (result) {
        $scope.cuentasBancarias = result.data;
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
            alert("Actualizado con Éxito la cuenta Bancaria: " + $scope.sucursalBancaria.codigoSucursalBancaria) + "\n Recargando...";
            $window.location.reload();
        }, function (result) {
            if (status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            } else {
                $scope.businessMessages = result.data;
            }
        });
    };

    $scope.delete = function () {
        if (confirm('¿Está seguro que desea borrar?')) {
            sucursalBancariaService.delete($routeParams.idSucursalBancaria).then(function (result) {
                alert("Borrado Con Éxito");
                $location.url('/findSucursal');
            }, function (result) {
                alert("Ha fallado la petición. Estado HTTP:" + result.status);
            });
        } else {

        }
    };

    $scope.cancel = function () {
        $location.url('/findSucursal/');
    };
}
app.controller("UpdateSucursalController", UpdateSucursalController);
