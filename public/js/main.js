var app = angular.module("myApp", [
    'ngRoute',
    'ui.bootstrap',
    'ui.tree',
    'homeController'
]);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

/*
 * Add app routing
 * $routeProvider will be automatically injected
 */
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'html/home.html',
            controller: 'homeCtrl'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);