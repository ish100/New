var surveyController = angular.module("surveyController", []);

surveyController.controller('surveyCtrl', ['$scope', function($scope) {

	var json = {
	    title: "Trip Preferences",
	    showProgressBar: "bottom",
	    firstPageIsStarted: true,
	    startSurveyText: "Start Survey",
	    pages: [
	        {
	            questions: [
	                {
	                    type: "html",
	                    html: "You are about to start the survey of 4 questions.<br/>Please click on <b>'Start Survey'</b> button when you are ready."
	                }
	            ]
	        }, {
	            questions: [
	                {
	                    type: "radiogroup",
	                    name: "company",
	                    title: "How would you like to travel?",
	                    choices: [
	                        "Solo", "Family", "Friends"
	                    ],
	                    isRequired: true
	                }
	            ]
	        }, {
	            questions: [
	                {
	                    type: "radiogroup",
	                    name: "kind",
	                    title: "What type of place do you prefer ?",
	                    choicesOrder: "random",
	                    choices: [
	                        "Mountains", "Plains", "Beaches", "Religious"
	                    ],
	                    isRequired: true
	                }
	            ]
	        }, {
	            questions: [
	                {
	                    type: "radiogroup",
	                    name: "season",
	                    title: "When would you like to travel?",
	                    choicesOrder: "random",
	                    choices: [
	                        "Summer", "Winter", "Monsoon"
	                    ],
	                    isRequired: true
	                }
	            ]
	        },  {
	        	questions: [
	        		{
			            type: "multipletext",
			            name: "priceLimit",
			            title: "Budget ",
			            isRequired: true,
			            colCount: 2,
			            "validators": [
			                {
			                    "type": "expression",
			                    "expression": "{pricelimit.leastamount} <= {pricelimit.mostamount}",
			                    "text": "Please correct the price. The first value should be less or equal to the second one."
			                }
			            ],
			            items: [
			                {
			                    name: "leastAmount",
			                    title: "The least amount per day",
			                    validators: [
			                        {
			                            type: "numeric",
			                            minValue: 10,
			                            maxValue: 10000
			                        }
			                    ]
			                }, {
			                    name: "mostAmount",
			                    title: "The most amount per day",
			                    validators: [
			                        {
			                            type: "numeric",
			                            minValue: 10,
			                            maxValue: 10000
			                        }
			                    ]
			                }
			            ]
			        }
	        	]
	        }
	    ],
	    completedHtml: "<h4>Thank you for taking the survey.</h4>"
	};

	window.survey = new Survey.Model(json);

	survey.onComplete.add(function (query) {
        $('#survey-message').html("Searching for: " + JSON.stringify(query.data));
		var req_data = Object.assign({}, query.data);
		$.get("results/", req_data, function (data) {
			$('#survey-message').html("<h2>Found " + data.length + " result(s)</h2>");
			$('#survey-result').removeClass("hidden").addClass("shown");
			
			$("body").append('<div id="template-result"></div>');
			$("#template-result").load("../../html/resultTpl.html", function() {
				var template = $(this).html();
				$.each(data, function(item) {
					var output = Mustache.render(template, data[item]);
					$("#survey-result").append(output);
		        });
			});
			$("#template-result").remove();
        });
    });

	$scope.surveyInit = function(scope) {
		survey.data = {
		    company: 'Solo',
		    kind: 'Mountains',
		    season: 'Summer',
		    priceLimit : {
		    	'leastAmount' : 200,
		    	'mostAmount' : 700
		    }
		};
		Survey.SurveyNG.render("surveyElement", {model: survey});
	}

	window.saveToFavourites = function(optionName) {
		var req_body = {
    		location : optionName
    	};
		$.post("/users/saveToFavourites", req_body, function(data) {
			if (data.status == "UNAUTHED")
				window.alert("Please login to save to favourites.");
			else if (data.status == true) 
				window.alert(optionName + " has been added to favourites!");
			else if (data.status == false) 
				window.alert(optionName + " is already added in favourites.");
		});
	}

}]);
