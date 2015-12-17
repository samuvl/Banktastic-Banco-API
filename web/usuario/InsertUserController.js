InsertUserController.$inject = ['$scope', 'usuarioService', '$location'];

function InsertUserController($scope, usuarioService, $location) {
    $scope.tipo = "INSERT";
    $scope.okBoton = "Insertar";
    $scope.usuario = {};
    
    $scope.ok = function () {

        var response = usuarioService.insert($scope.usuario);
        
        response.success(function (data, status, headers, config) {
            alert("Usuario Insertado con Éxito con el nombre: " + $scope.usuario.nombre);
            $location.url("/findUser");
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
        $location.url('/');
    };

}
app.controller("InsertUserController", InsertUserController);