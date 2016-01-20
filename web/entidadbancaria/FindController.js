FindController.$inject = ['$scope', '$routeParams', 'entidadBancariaService'];

function FindController($scope, $routeParams, entidadBancariaService) {
    $scope.tipo = "FIND";


    entidadBancariaService.find().then(function (result) {
        $scope.entidadesBancarias = result.data;
    }, function (result) {
        if (result.status === 403) {
                alert("Debes estar logeado para acceder a éste contenido.");
        } else {
            alert("Ha fallado la petición. Estado HTTP:" + result.status);
        }
    });

}
app.controller("FindController", FindController);
