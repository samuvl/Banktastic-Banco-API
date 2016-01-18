FindController.$inject = ['$scope', '$routeParams', 'entidadBancariaService'];

function FindController($scope, $routeParams, entidadBancariaService) {
    $scope.tipo = "FIND";

    var response;
    if ($routeParams.nombre === undefined) {
        entidadBancariaService.find().then(function (result) {
            $scope.entidadesBancarias = result.data;
        });
    }
    else {
        entidadBancariaService.findByNombre($routeParams.nombre).then(function (result) {
            $scope.entidadesBancarias = result.data;
        });
    }
}
app.controller("FindController", FindController);
