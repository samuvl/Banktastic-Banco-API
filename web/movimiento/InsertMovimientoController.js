InsertMovimientoController.$inject = ['$scope', 'movimientoService','$location','cuentaBancariaService'];

function InsertMovimientoController($scope, movimientoService, $location, cuentaBancariaService){
    
    $scope.movimiento = {};//tipomovimiento, concepto, importe,
    
    //aqui podemos añadir al json movimiento algunos atributos.. 
    
    $scope.movimiento.cuentaBancaria = $scope.cuentaBancaria;//añado cuentaBancaria
    
    $scope.movimiento.fechaMovimiento = new Date(); //añado la fecha para que sea la de hoy
    
     $scope.ok = function () {       
        
        movimientoService.insertMovimiento($scope.movimiento).then(function (result) {
            alert("Movimiento Insertado con Éxito con el id: " + $scope.movimiento.idMovimientoBancario);
            
        }, function (result) {
            if (status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            } else {
                $scope.businessMessages = result.data;
            }
        });
    };

    $scope.cancel = function () {
        $location.url('/');
    };
    
}

app.controller("InsertMovimientoController", InsertMovimientoController);