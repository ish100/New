var favouritesController = angular.module("favouritesController", []);

favouritesController.controller('favouritesCtrl', ['$scope', function($scope) {

	$scope.favouritesInit = function(scope) {
		$.get("/users/savedFavourites", function(data) {
            if (data.status == STATUS.AUTHED) {
            	$('#favourites-message').html("<h2>You saved " + data.results.length + " destination(s)!</h2>");
            	if (data.results.length > 0) {
            		$('#favourites-result').removeClass("hidden").addClass("shown");
					$("body").append('<div id="template-result"></div>');
					$("#template-result").load("../../html/resultTpl.html", function() {
						var template = $(this).html();
						$.each(data.results, function(item) {
							var output = Mustache.render(template, data.results[item]);
							$("#favourites-result").append(output);
				        });
					});
					$("#template-result").remove();
            	}
            	console.log(data.results);
            } else {
            	$('#favourites-message').html("<h3>Please <a href='#/login'>login</a> first</h3>");
            }
        });
	}

}]);