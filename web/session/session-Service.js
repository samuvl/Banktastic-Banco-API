SessionService.$inject = ['$http'];

function SessionService($http) {
    this.login = function (usuario) {
        var response = $http({
            method: "POST",
            url: "/banktastic-banco-api/api/session",
            data: usuario
        });
        return response;
    };
    
    this.logout = function () {
        var response = $http({
            method: "DELETE",
            url: "/banktastic-banco-api/api/session"
        });
        return response;
    };
}
app.service("sessionService", SessionService);

