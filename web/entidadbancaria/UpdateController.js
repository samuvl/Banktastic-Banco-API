UpdateController.$inject = ['$scope', '$routeParams', 'entidadBancariaService', '$location', '$window'];
function UpdateController($scope, $routeParams, entidadBancariaService, $location, $window) {

    $scope.entidadBancaria = {};
    $scope.entidadBancaria.idEntidadBancaria = $routeParams.idEntidadBancaria;
    $scope.tipo = "UPDATE";
    $scope.okBoton = "Actualizar";
    $scope.deleteBoton = "Borrar";

    entidadBancariaService.get($routeParams.idEntidadBancaria).then(function (result) {
        $scope.entidadBancaria = result.data;
        $scope.entidadBancaria.fechaCreacion = new Date($scope.entidadBancaria.fechaCreacion);
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });


    $scope.ok = function () {
        entidadBancariaService.update($scope.entidadBancaria).then(function (result) {
            alert("Actualizado con Éxito la Entidad Bancaria: " + $scope.entidadBancaria.nombre) + "\n Recargando...";
            $window.location.reload();
        }, function (result) {
            if (result.status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + result.status);
            } else {
                $scope.businessMessages = result.data;
            }
        });
    };

    $scope.delete = function () {
        if (confirm('¿Está seguro que desea borrar?')) {
            entidadBancariaService.delete($routeParams.idEntidadBancaria).then(function (result) {
                alert("Borrado Con Éxito");
                $location.url('/find');
            }, function (result) {
                alert("Error Borrando la entidad:  " + result.status);
            });
        } else {

        }
    };

    $scope.cancel = function () {
        $location.url('/find');
    };
}
app.controller("UpdateController", UpdateController);
