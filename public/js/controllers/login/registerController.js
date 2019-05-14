var registerController = angular.module("registerController", []);
registerController.controller('registerCtrl', ['$scope', function ($scope) {

    $scope.registerInit = function () {

    }

    $scope.register = function() {
    	console.log("register attempt");
    }

}]);