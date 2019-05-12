var homeController = angular.module("homeController", []);

homeController.controller('homeCtrl', ['$scope', function($scope) {
    $scope.loginBtn = "Log In";
    $scope.userNeedsLogin = false;

    $scope.userLogin = function() {
        console.log("login attempt");
        window.location.href = "/#/login";
    }

}]);