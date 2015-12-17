GetUserController.$inject = ['$scope', '$routeParams', 'usuarioService', '$location'];

function GetUserController($scope, $routeParams, usuarioService, $location) {
    $scope.tipo = "GET";
    $scope.okBoton = "Obtener";
    var response = usuarioService.get($routeParams.idUsuario);

    response.success(function (data, status, headers, config) {
        $scope.usuario = data;
    });

    $scope.cancel = function () {
        $location.url('/findUser/');
    };
}
app.controller("GetUserController", GetUserController);