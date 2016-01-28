LoginController.$inject = ['$rootScope', '$scope', '$location', 'sessionService'];
function LoginController($rootScope, $scope, $location, sessionService) {

    $scope.usuario = {};

    $scope.ok = function () {

        var response = sessionService.login($scope.usuario).success(function (data, status, headers, config) {
            $location.url("/");
            $rootScope.session = data;
        }).error(function (data, status, headers, config) {
            if (status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            } else {
                $scope.businessMessages = data;
            }
        });
    };
}
app.controller("LoginController", LoginController);