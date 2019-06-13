var registerController = angular.module("registerController", []);
registerController.controller('registerCtrl', ['$scope', function ($scope) {

    $scope.registerInit = function (scope) {
    }

    $scope.register = function() {
    	console.log("register attempt");
    	var req_body = {
    		fname : $("#firstName")[0].value,
    		lname : $("#lastName")[0].value,
    		uname : $("#username")[0].value,
    		pass : $("#password")[0].value
    	}
    	$.post("/users/register", req_body, function(data) {
            if (data.status == STATUS.AUTHED) {
                window.location.href = "/#/login";
            } else if (data.status == "DUPLICATE") {
                $('#duplicate-registration').removeClass("hidden").addClass("shown");
            }
    	});
    }

}]);