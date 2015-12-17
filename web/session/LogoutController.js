LogoutController.$inject = ['$scope', '$location', 'sessionService'];
function LogoutController($scope, $location, sessionService) {

    var response = sessionService.logout();

    response.success(function (data, status, headers, config) {
        $location.url('/logout/');
    });
}
app.controller("LogoutController", LogoutController);