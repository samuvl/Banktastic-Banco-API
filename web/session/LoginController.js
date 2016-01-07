LoginController.$inject = ['$scope', '$location', 'sessionService'];
function LoginController($scope, $location, sessionService) {
    
    $scope.usuario={};

    $scope.ok = function () {
        
        var response = sessionService.login($scope.usuario);
        
         response.success(function (data, status, headers, config) {
            alert("Bienvenido a Banktastic.");
            $location.url("/");
        });

        response.error(function (data, status, headers, config) {
            if (status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            } else {
                $scope.businessMessages = data;
            }
        });
    };
}
app.controller("LoginController", LoginController);