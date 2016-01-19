CuentaBancariaService.$inject = ['$http'];

function CuentaBancariaService($http) {

    this.get = function (idCuentaBancaria) {
        var response = $http({
            method: "GET",
            url: "/banktastic-banco-api/api/cuentabancaria/" + idCuentaBancaria
        });
        return response;
    };

    this.insert = function (cuentaBancaria) {
        var response = $http({
            method: "POST",
            url: "/banktastic-banco-api/api/cuentabancaria",
            data: cuentaBancaria
        });
        return response;
    };

    this.update = function (cuentaBancaria) {
        var response = $http({
            method: "PUT",
            url: "/banktastic-banco-api/api/cuentabancaria/",
            data: cuentaBancaria
        });
        return response;
    };

    this.delete = function (idCuentaBancaria) {
        var response = $http({
            method: "DELETE",
            url: "/banktastic-banco-api/api/cuentabancaria/" + idCuentaBancaria
        });
        return response;
    };

    this.find = function () {
        var response = $http({
            method: "GET",
            url: "/banktastic-banco-api/api/cuentabancaria"
        });
        return response;
    };

    this.findCuentaBySucursal = function (idSucursalBancaria) {
        var response = $http({
            method: "GET",
            url: "/banktastic-banco-api/api/cuentabancariabysucursal/" + idSucursalBancaria
        });
        return response;
    };

}
app.service("cuentaBancariaService", CuentaBancariaService);