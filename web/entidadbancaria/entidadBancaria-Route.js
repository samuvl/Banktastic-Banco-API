app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/find/', {
            templateUrl: "entidadbancaria/entidadBancaria-List.html",
            controller: "FindController"
        });
        
        $routeProvider.when('/find/:nombre', {
            templateUrl: "entidadbancaria/entidadBancaria-List.html",
            controller: "FindController"
        });        
        
        $routeProvider.when('/get/:idEntidadBancaria', {
            templateUrl: "entidadbancaria/detail.html",
            controller: "GetController"
        });

        $routeProvider.when('/delete/:idEntidadBancaria', {
            templateUrl: "entidadbancaria/detail.html",
            controller: "DeleteController"
        });

        $routeProvider.when('/insert/', {
            templateUrl: "entidadbancaria/detail.html",
            controller: "InsertController"
        });

        $routeProvider.when('/update/:idEntidadBancaria', {
            templateUrl: "entidadbancaria/detail.html",
            controller: "UpdateController"
        });
    }]);