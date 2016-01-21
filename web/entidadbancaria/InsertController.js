InsertController.$inject = ['$scope', 'entidadBancariaService', '$location', '$window'];
function InsertController($scope, entidadBancariaService, $location, $window) {
    $scope.tipo = "INSERT";
    $scope.okBoton = "Insertar";
    $scope.entidadBancaria = {};

    $scope.ok = function () {
        entidadBancariaService.insert($scope.entidadBancaria).then(function (result) {
            alert("Entidad Insertada con Éxito con el nombre: " + $scope.entidadBancaria.nombre);
            $location.url("/find");
        }, function (result) {
            if (result.status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + result.status);
            } else {
                $scope.businessMessages = result.data;
            }
        });

    };

    $scope.cancel = function () {
        $location.url('/find');
    };

}
app.controller("InsertController", InsertController);