FindUserController.$inject = ['$scope', '$routeParams', 'usuarioService'];

function FindUserController($scope, $routeParams, usuarioService) {
    $scope.tipo = "FIND";
    
    var response;
    if ($routeParams.nombre === undefined) {
        response = usuarioService.find();
        response.success(function (data, status, headers, config) {
            $scope.usuarios = data;
        });
    }
    else {
        response = usuarioService.findByNombre($routeParams.nombre);
        response.success(function (data, status, headers, config) {
            $scope.usuarios = data;
        });
    }
}
app.controller("FindUserController", FindUserController);
