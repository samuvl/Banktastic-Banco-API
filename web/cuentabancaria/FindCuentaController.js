FindCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService', 'usuarioService'];

function FindCuentaController($scope, $routeParams, cuentaBancariaService, usuarioService) {
    $scope.tipo = "FIND";

    $scope.filtrarDni = function () {
        cuentaBancariaService.findCuentaBydni($scope.dni).then(function (result) {
            $scope.cuentasBancarias = result.data;
        }, function (result) {
            if (status === 500) {
                alert("Ha fallado la petición. Estado:" + status);
            } else {
                $scope.businessMessages = result.data;
            }
        });
    };

    if ($scope.dni === undefined) {
        cuentaBancariaService.find().then(function (result) {
            $scope.cuentasBancarias = result.data;
        }, function (result) {
            if (result.status === 403) {
                alert("Debes estar logeado para acceder a éste contenido.");
            } else {
                alert("Ha fallado la petición. Estado HTTP:" + result.status);
            }
        });
    } else {
        // nada
    }

}
app.controller("FindCuentaController", FindCuentaController);
