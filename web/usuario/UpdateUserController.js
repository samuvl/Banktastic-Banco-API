UpdateUserController.$inject = ['$scope', '$routeParams', 'usuarioService', '$location', '$window'];

function UpdateUserController($scope, $routeParams, usuarioService, $location, $window) {

    $scope.usuario = {};
    $scope.usuario.idUsuario = $routeParams.idUsuario;
    $scope.tipo = "UPDATE";
    $scope.okBoton = "Actualizar";

    var response = usuarioService.get($routeParams.idUsuario);

    response.success(function (data, status, headers, config) {
        $scope.usuario = data;
    });

    response.error(function (data, status, headers, config) {
        alert("Ha fallado la petición. Estado HTTP:" + status);
    });


    $scope.ok = function () {
        var response = usuarioService.update($scope.usuario);

        response.success(function (data, status, headers, config) {
            alert("Actualizado con Éxito el Usuario: " + $scope.usuario.idUsuario) + "\n Recargando...";
            $window.location.reload();
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
        $location.url('/findUser/');
    };
}
app.controller("UpdateUserController", UpdateUserController);
