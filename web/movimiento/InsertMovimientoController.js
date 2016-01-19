InsertMovimientoController.$inject = ['$scope', 'movimientoService', '$location', 'cuentaBancariaService','sharedPropierties'];

function InsertMovimientoController($scope, movimientoService, $location, cuentaBancariaService, sharedPropierties){
    
    
    $scope.movimiento = {};//tipomovimiento, concepto, importe,
    
    cuentaBancariaService.get(sharedPropierties.getProperty()).then(function (result) {
        $scope.movimiento.cuentaBancaria = result.data;
        $scope.movimiento.saldo = $scope.movimiento.cuentaBancaria.saldo;
    }, function (result){        
        alert("Ha fallado la peticion. Estado HTTP:"+result.status);
    }); 
    
     $scope.ok = function () {       
        
         $scope.movimiento.fechaMovimiento = new Date(); //añado la fecha para que sea la de hoy
         
        movimientoService.insertMovimiento($scope.movimiento).then(function (result) {
            alert("Movimiento Insertado con Éxito");
        }, function (result) {
            if (result.status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + result.status);
            } else {
                $scope.businessMessages = result.data;
            }
        });
    };

    $scope.cancel = function () {
        $location.url('/findCuenta');
    };

}

app.controller("InsertMovimientoController", InsertMovimientoController);
