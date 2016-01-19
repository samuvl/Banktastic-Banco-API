UpdateUserController.$inject = ['$scope', '$routeParams', 'usuarioService', 'cuentaBancariaService', '$location', '$window'];

function UpdateUserController($scope, $routeParams, usuarioService, cuentaBancariaService, $location, $window) {

    $scope.usuario = {};
    $scope.usuario.idUsuario = $routeParams.idUsuario;
    $scope.tipo = "UPDATE";
    $scope.okBoton = "Actualizar";
    $scope.deleteBoton = "Borrar";

    cuentaBancariaService.findCuentaByUsuario($scope.usuario.idUsuario).then(function (result) {
        $scope.cuentasBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    usuarioService.get($routeParams.idUsuario).then(function (result) {
        $scope.usuario = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });


    $scope.ok = function () {
        usuarioService.update($scope.usuario).then(function (result) {
            alert("Actualizado con Éxito el Usuario: " + $scope.usuario.idUsuario) + "\n Recargando...";
            $location.url('/findUser/');
        }, function (result) {
            if (result, status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + result.status);
            } else {
                $scope.businessMessages = result.data;
            }
        });
    };

    $scope.delete = function () {
        if (confirm('¿Está seguro que desea borrar?')) {
            usuarioService.delete($routeParams.idUsuario).then(function (result) {
                alert("Borrado Con Éxito");
                $location.url('/findUser');
            }, function (result) {
                alert("Error Borrando la entidad:  " + result.status);
            });
        } else {
        }
    };

    $scope.cancel = function () {
        $location.url('/findUser/');
    };
}
app.controller("UpdateUserController", UpdateUserController);
