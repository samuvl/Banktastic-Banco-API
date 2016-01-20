FindUserController.$inject = ['$scope', '$routeParams', 'usuarioService'];

function FindUserController($scope, $routeParams, usuarioService) {
    $scope.tipo = "FIND";

    usuarioService.find().then(function (result) {
        $scope.usuarios = result.data;
    }, function (result) {
        if (result.status === 403) {
            alert("Debes estar logeado para acceder a éste contenido.");
        } else {
            alert("Ha fallado la petición. Estado HTTP:" + result.status);
        }
    });

}
app.controller("FindUserController", FindUserController);
