UpdateController.$inject = ['$scope', '$routeParams', 'entidadBancariaService', '$location', '$window'];
function UpdateController($scope, $routeParams, entidadBancariaService, $location, $window) {

    $scope.entidadBancaria = {};
    $scope.entidadBancaria.idEntidadBancaria = $routeParams.idEntidadBancaria;
    $scope.tipo = "UPDATE";
    $scope.okBoton = "Actualizar";
    $scope.deleteBoton = "Borrar";

    var response = entidadBancariaService.get($routeParams.idEntidadBancaria);

    response.success(function (data, status, headers, config) {
        $scope.entidadBancaria = data;
        $scope.entidadBancaria.fechaCreacion = new Date($scope.entidadBancaria.fechaCreacion);
    });

    response.error(function (data, status, headers, config) {
        alert("Ha fallado la petición. Estado HTTP:" + status);
    });


    $scope.ok = function () {
        var response = entidadBancariaService.update($scope.entidadBancaria);

        response.success(function (data, status, headers, config) {
            alert("Actualizado con Éxito la Entidad Bancaria: " + $scope.entidadBancaria.idEntidadBancaria) + "\n Recargando...";
            $window.location.reload();
        });
        
        response.error(function (data, status, headers, config) {
            if (status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            } else {
                $scope.businessMessages = data;
            }
        });
    };
    
        $scope.delete = function () {

        var response = entidadBancariaService.delete($routeParams.idEntidadBancaria);

        response.success(function (data, status, headers, config) {
            alert("Borrado Con Éxito");
            $location.url('/find');
        });
        response.error(function (data, status, headers, config) {
            alert("Error Borrando la entidad:  " + status);
        });
    };

    $scope.cancel = function () {
        $location.url('/find');
    };
}
app.controller("UpdateController", UpdateController);
