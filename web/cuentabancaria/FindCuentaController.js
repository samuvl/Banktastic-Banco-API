FindCuentaController.$inject = ['$scope', '$routeParams', 'cuentaBancariaService', 'usuarioService'];

function FindCuentaController($scope, $routeParams, cuentaBancariaService, usuarioService) {
    $scope.tipo = "FIND";
    
    $scope.filtrarDni = function(){
        
     cuentaBancariaService.findCuentaBydni($scope.dni).then(function (result) {
        $scope.cuentasBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });   
    
    };
    
    
    if($scope.dni==null){
       cuentaBancariaService.find().then(function (result) {
        $scope.cuentasBancarias = result.data;
    }, function (result) {
        alert("Ha fallado la petición. Estado HTTP:" + result.status);
    });  
        
    }else{
        
        //nada
    }
        
        
        
    
      
         
        
    
    

}
app.controller("FindCuentaController", FindCuentaController);
