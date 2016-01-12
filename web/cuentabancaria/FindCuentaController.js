FindCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService'];

function FindCuentaController($scope, $routeParams, cuentaBancariaService) {
    $scope.tipo = "FIND";

    var response = cuentaBancariaService.find();
    response.success(function (data, status, headers, config) {
        $scope.cuentasBancarias = data;
    });

}
app.controller("FindCuentaController", FindCuentaController);
