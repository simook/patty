'use strict';

var app = angular.module('pattyApp');

app.controller('SearchIndexCtrl', function ($scope, auth, searches, Query) {
	auth.resolve().then(function(){
		searches.resolve();
	});

	$scope.removeSearch = function(search){
		Query.remove(search.id);
	};

	$scope.removeResults = function(search){
		Query.removeResults(search.id);
	};

	$scope.removeResult = function(search, result){
		Query.removeResult(search.id, result);
	};

	$scope.runSearch = function(search){
		Query.run(search.id);
	};

});

app.controller('SearchNewCtrl', function ($scope, auth, Query) {
	auth.resolve();

	$scope.data = {
		locations: [],
		items: [],
		settings: {}
	};

	$scope.currentStepValue = 1;

	$scope.currentStep = {
		if: function(step){
			return ($scope.currentStepValue === step);
		},
		is: function(step){
			$scope.currentStepValue = step;
		}
	};

	$scope.submit = function(){
		Query.create($scope.data);
	};
});
