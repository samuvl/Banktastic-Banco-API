InsertController.$inject = ['$scope', 'entidadBancariaService', '$location', '$window'];
function InsertController($scope, entidadBancariaService, $location, $window) {
    $scope.tipo = "INSERT";
    $scope.okBoton = "Insertar";
    $scope.entidadBancaria = {};

    $scope.ok = function () {

        var response = entidadBancariaService.insert($scope.entidadBancaria);

        response.success(function (data, status, headers, config) {
            alert("Entidad Insertada con Éxito con el nombre: " + $scope.entidadBancaria.nombre);
            $location.url("/find");
        });

        response.error(function (data, status, headers, config) {
            if (status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            } else {
                $scope.businessMessages = data;
            }
        });
    };
    $scope.cancel = function () {
        $location.url('/');
    };

}
app.controller("InsertController", InsertController);