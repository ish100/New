var homeController = angular.module("homeController", []);

homeController.controller('homeCtrl', ['$scope', function($scope) {
    $scope.loginBtn = "Log In";
    $scope.registerBtn = "Register";
    $scope.surveyBtn = "Take Survey";
    $scope.favouritesBtn = "My Favourites";
    $scope.userNeedsLogin = false;

    $scope.userLogin = function() {
        console.log("login attempt");
        window.location.href = "/#/login";
    }

    $scope.survey = function() {
        console.log("login attempt");
        window.location.href = "/#/survey";
    }

    $scope.userRegister = function() {
        console.log("register attempt");
        window.location.href = "/#/register";
    }

    $scope.favourites = function() {
        console.log("favourites attempt");
        window.location.href = "/#/favourites";
    }

    $scope.registerBtn

}]);