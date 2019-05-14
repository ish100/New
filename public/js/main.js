var app = angular.module("myApp", [
    'ngRoute',
    'ui.bootstrap',
    'homeController',
    'surveyController',
    'loginController'
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
        when('/login', {
            templateUrl: 'html/login.html',
            controller: 'loginCtrl'
        }).
        when('/survey', {
            templateUrl: 'html/survey.html',
            controller: 'surveyCtrl'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);