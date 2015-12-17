FindController.$inject = ['$scope', '$routeParams', 'entidadBancariaService'];

function FindController($scope, $routeParams, entidadBancariaService) {
    $scope.tipo = "FIND";
    
    var response;
    if ($routeParams.nombre === undefined) {
        response = entidadBancariaService.find();
        response.success(function (data, status, headers, config) {
            $scope.entidadesBancarias = data;
        });
    }
    else {
        response = entidadBancariaService.findByNombre($routeParams.nombre);
        response.success(function (data, status, headers, config) {
            $scope.entidadesBancarias = data;
        });
    }
}
app.controller("FindController", FindController);
