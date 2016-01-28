LogoutController.$inject = ['$rootScope', '$scope', '$location', 'sessionService'];
function LogoutController($rootScope, $scope, $location, sessionService) {

    var response = sessionService.logout();

    response.success(function (data, status, headers, config) {
        $rootScope.session = {};

        $location.url('/logout/');
    });
}
app.controller("LogoutController", LogoutController);