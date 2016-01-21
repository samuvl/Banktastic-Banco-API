SucursalBancariaService.$inject = ['$http'];

function SucursalBancariaService($http) {

    this.get = function (idSucursalBancaria) {
        var response = $http({
            method: "GET",
            url: "/banktastic-banco-api/api/sucursalbancaria/" + idSucursalBancaria
        });
        return response;
    };

    this.insert = function (sucursalBancaria) {
        var response = $http({
            method: "POST",
            url: "/banktastic-banco-api/api/sucursalbancaria",
            data: sucursalBancaria
        });
        return response;
    };

    this.update = function (sucursalBancaria) {
        var response = $http({
            method: "PUT",
            url: "/banktastic-banco-api/api/sucursalbancaria/",
            data: sucursalBancaria
        });
        return response;
    };

    this.delete = function (idSucursalBancaria) {
        var response = $http({
            method: "DELETE",
            url: "/banktastic-banco-api/api/sucursalbancaria/" + idSucursalBancaria
        });
        return response;
    };

    this.find = function () {
        var response = $http({
            method: "GET",
            url: "/banktastic-banco-api/api/sucursalbancaria"
        });
        return response;
    };
    
    this.findSucursalByEntidad = function (idEntidadBancaria) {
        var response = $http({
            method: "GET",
            url: "/banktastic-banco-api/api/sucursalbancaria?entidadbancaria.idEntidadBancaria=" + idEntidadBancaria
        });
        return response;
    };
    
    
    
}
app.service("sucursalBancariaService", SucursalBancariaService);