GetController.$inject = ['$scope', '$routeParams', 'entidadBancariaService', '$location'];

function GetController($scope, $routeParams, entidadBancariaService, $location) {
    $scope.tipo = "GET";
    $scope.okBoton = "Obtener";
    var response = entidadBancariaService.get($routeParams.idEntidadBancaria);

    response.success(function (data, status, headers, config) {
        $scope.entidadBancaria = data;
        $scope.entidadBancaria.fechaCreacion = new Date($scope.entidadBancaria.fechaCreacion);
    });

    $scope.cancel = function () {
        $location.url('/find/');
    };
}
app.controller("GetController", GetController);