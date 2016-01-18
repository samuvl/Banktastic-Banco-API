FindUserController.$inject = ['$scope', '$routeParams', 'usuarioService'];

function FindUserController($scope, $routeParams, usuarioService) {
    $scope.tipo = "FIND";

    if ($routeParams.nombre === undefined) {
        usuarioService.find().then(function (result) {
            $scope.usuarios = result.data;
        });
    }
    else {
        usuarioService.findByNombre($routeParams.nombre).then(function (result) {
            $scope.usuarios = result.data;
        });
    }
}
app.controller("FindUserController", FindUserController);
