InsertSucursalController.$inject = ['$scope', 'sucursalBancariaService', 'entidadBancariaService', '$location', '$window'];
function InsertSucursalController($scope, sucursalBancariaService, entidadBancariaService, $location, $window) {
    $scope.tipo = "INSERT";
    $scope.okBoton = "Insertar";
    $scope.sucursalBancaria = {};


    entidadBancariaService.find().then(function (result) {
        $scope.entidadesBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    $scope.ok = function () {
        sucursalBancariaService.insert($scope.sucursalBancaria).then(function (result) {
            alert("Sucursal Insertada con Éxito, codigo Sucursal: " + $scope.sucursalBancaria.codigoSucursalBancaria);
            $location.url("/findSucursal");
        }, function (result) {
            if (status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            } else {
                $scope.businessMessages = result.data;
            }
        });
    };

    $scope.cancel = function () {
        $location.url('/');
    };

}
app.controller("InsertSucursalController", InsertSucursalController);