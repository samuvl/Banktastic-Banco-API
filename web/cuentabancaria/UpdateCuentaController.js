UpdateCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService', 'usuarioService', 'sucursalBancariaService', 'movimientoService','sharedPropierties','$location', '$window'];
function UpdateCuentaController($scope, $routeParams, cuentaBancariaService, usuarioService, sucursalBancariaService, movimientoService, sharedPropierties, $location, $window) {

    $scope.cuentaBancaria = {};
    $scope.cuentaBancaria.idCuentaBancaria = $routeParams.idCuentaBancaria;
    $scope.tipo = "UPDATE";
    $scope.okBoton = "Actualizar";
    $scope.deleteBoton = "Borrar";


    usuarioService.find().then(function (result) {
        $scope.usuarios = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    sucursalBancariaService.find().then(function (result) {
        $scope.sucursalesBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    cuentaBancariaService.get($routeParams.idCuentaBancaria).then(function (result) {
        $scope.cuentaBancaria = result.data;
        $scope.cuentaBancaria.fechaCreacion = new Date($scope.cuentaBancaria.fechaCreacion);
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });
    
    //añado lo que seria el detalle de movimientos.
    movimientoService.getMovimiento($routeParams.idCuentaBancaria).then(function (result) {
        //pasar parametro idCuentaBancaria con el service sharedPropierties
        sharedPropierties.setProperty($routeParams.idCuentaBancaria);
        $scope.movimientos = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });

    $scope.ok = function () {
        cuentaBancariaService.update($scope.cuentaBancaria).then(function (result) {
            alert("Actualizado con Éxito la cuenta Bancaria: " + $scope.cuentaBancaria.numeroCuenta) + "\n Recargando...";
            $location.url('/findCuenta/');
        }, function (result) {
            if (result.status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + result.status);
            } else {
                $scope.businessMessages = result.data;
            }
        });

    };

    $scope.delete = function () {
        if (confirm('¿Está seguro que desea borrar?')) {
            cuentaBancariaService.delete($routeParams.idCuentaBancaria).then(function (result) {
                alert("Borrado Con Éxito");
                $location.url('/findCuenta');
            }, function (result) {
                alert("Ha fallado la petición. Estado HTTP:" + result.status);
            });
        } else {

        }
    };


    $scope.cancel = function () {
        $location.url('/findCuenta/');
    };
}
app.controller("UpdateCuentaController", UpdateCuentaController);
