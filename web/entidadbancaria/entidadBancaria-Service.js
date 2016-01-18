EntidadBancariaService.$inject = ['$http'];

function EntidadBancariaService($http) {

//    this.get = function (idEntidadBancaria) {
//        var response = $http({
//            method: "GET",
//            url: "/banktastic-banco-api/api/entidadbancaria/" + idEntidadBancaria
//        });
//        return response;
//    };

    this.insert = function (entidadBancaria) {
        var response = $http({
            method: "POST",
            url: "/banktastic-banco-api/api/entidadbancaria",
            data: entidadBancaria
        });
        return response;
    };

    this.update = function (entidadBancaria) {
        var response = $http({
            method: "PUT",
            url: "/banktastic-banco-api/api/entidadbancaria/" + entidadBancaria.idEntidadBancaria,
            data: entidadBancaria
        });
        return response;
    };

    this.delete = function (idEntidadBancaria) {
        var response = $http({
            method: "DELETE",
            url: "/banktastic-banco-api/api/entidadbancaria/" + idEntidadBancaria
        });
        return response;
    };

    this.find = function () {
        var response = $http({
            method: "GET",
            url: "/banktastic-banco-api/api/entidadbancaria"
        });
        return response;
    };

    this.findByNombre = function (nombre) {
        var response = $http({
            method: "GET",
            url: "/banktastic-banco-api/api/entidadbancaria/?nombre=" + nombre
        });
        return response;
    };
}
app.service("entidadBancariaService", EntidadBancariaService);