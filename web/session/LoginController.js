LoginController.$inject = ['$scope', '$location', 'sessionService'];
function LoginController($scope, $location, sessionService) {
    
    $scope.usuario={};

    $scope.ok = function () {
        
        sessionService.login($scope.usuario);
        $location.url('/');
    };
}
app.controller("LoginController", LoginController);