IndexController.$inject = ['$rootScope', '$scope', 'sessionService'];

function IndexController($rootScope, $scope, sessionService) {
    sessionService.logged().then(function (result) {
        $rootScope.session = result.data;
    }, function () {
        $rootScope.session = {};
    });
}
app.controller("IndexController", IndexController);