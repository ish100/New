var surveyController = angular.module("surveyController", []);

surveyController.controller('surveyCtrl', ['$scope', function($scope) {

	var json = {
	    title: "American History",
	    showProgressBar: "bottom",
	    firstPageIsStarted: true,
	    startSurveyText: "Start Survey",
	    pages: [
	        {
	            questions: [
	                {
	                    type: "html",
	                    html: "You are about to start the survey of 3 questions.<br/>Please click on <b>'Start Survey'</b> button when you are ready."
	                }
	            ]
	        }, {
	            questions: [
	                {
	                    type: "radiogroup",
	                    name: "civilwar",
	                    title: "When was the Civil War?",
	                    choices: [
	                        "1750-1800", "1800-1850", "1850-1900", "1900-1950", "after 1950"
	                    ],
	                    correctAnswer: "1850-1900"
	                }
	            ]
	        }, {
	            questions: [
	                {
	                    type: "radiogroup",
	                    name: "libertyordeath",
	                    title: "Who said 'Give me liberty or give me death?'",
	                    choicesOrder: "random",
	                    choices: [
	                        "John Hancock", "James Madison", "Patrick Henry", "Samuel Adams"
	                    ],
	                    correctAnswer: "Patrick Henry"
	                }
	            ]
	        }, {
	            questions: [
	                {
	                    type: "radiogroup",
	                    name: "magnacarta",
	                    title: "What is the Magna Carta?",
	                    choicesOrder: "random",
	                    choices: [
	                        "The foundation of the British parliamentary system", "The Great Seal of the monarchs of England", "The French Declaration of the Rights of Man", "The charter signed by the Pilgrims on the Mayflower"
	                    ],
	                    correctAnswer: "The foundation of the British parliamentary system"
	                }
	            ]
	        }
	    ],
	    completedHtml: "<h4>Thank you for taking the survey. <br><br>Redirecting to results..</h4>"
	};

	window.survey = new Survey.Model(json);

	survey.onComplete.add(function (result) {
        document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
    });

	$scope.surveyInit = function(scope) {
		Survey.SurveyNG.render("surveyElement", {model: survey});
	}

}]);
