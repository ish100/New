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
    	var req_body = {
    		uname : $("#username")[0].value,
    		pass : $("#password")[0].value
    	};
    	$.post("/users/isAuth", req_body, function(data) {
            if (data.status == STATUS.AUTHED) {
            	$('#loginsuccessful').removeClass("hidden").addClass("shown");
                $('#loginfailed').removeClass("shown").addClass("hidden");
            } else {
            	$('#loginsuccessful').removeClass("shown").addClass("hidden");
                $('#loginfailed').removeClass("hidden").addClass("shown");
            }
    	});
    }

}]);