var loginController = angular.module("loginController", []);
const STATUS = {
    "AUTHED": "AUTHED",
    "UNAUTHED": "AUTH_REQUIRED"
};
loginController.controller('loginCtrl', ['$scope', function ($scope) {

    $scope.loginInit = function () {

    }

    $scope.login = function() {
    	console.log("login attempt");
    }

}]);