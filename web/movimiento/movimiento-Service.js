MovimientoService.$inject=['$http'];

function MovimientoService($http){
    
        this.getMovimiento = function (idcuentaBancaria) {
        var response = $http({
            method: "GET",
            url: "/banktastic-banco-api/api/movimientobancario/" + idcuentaBancaria
        });
        return response;
    };
    
    this.insertMovimiento = function (movimiento) {
        var response = $http({
            method: "POST",
            url: "/banktastic-banco-api/api/movimientobancario",
            data: movimiento
        });
        return response;
    };
    
};

app.service("movimientoService", MovimientoService);