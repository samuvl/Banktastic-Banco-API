InsertUserController.$inject = ['$scope', 'usuarioService', '$location'];

function InsertUserController($scope, usuarioService, $location) {
    $scope.tipo = "INSERT";
    $scope.okBoton = "Insertar";
    $scope.usuario = {};

    $scope.ok = function () {
        usuarioService.insert($scope.usuario).then(function (result) {
            alert("Usuario Insertado con Éxito con el nombre: " + $scope.usuario.nombre);
            $location.url("/findUser");
        }, function (result) {
            if (result.status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + result.status);
            } else {
                $scope.businessMessages = result.data;
            }
        });

    };
    
    $scope.cancel = function () {
        $location.url('/findUser');
    };

}
app.controller("InsertUserController", InsertUserController);