'use strict';

var app = angular.module('pattyApp');

app.controller('ResultsIndexCtrl', function ($scope, auth, list, Query) {
	$scope.auth = auth;
	$scope.list = list;
});

app.controller('SearchIndexCtrl', function ($scope, auth, list, Query) {
	$scope.auth = auth;
	$scope.list = list;

	$scope.runSearch = function(item){
		Query.run(item);
	};

	$scope.selectItem = function(item){
		$scope.selected = item;
	};

	$scope.deleteItem = function(id){
		list.$remove('searches/' + id);
		$scope.selected = null;
	};
});

app.controller('SearchNewCtrl', function ($scope, $location, auth, sites, Query) {
	$scope.auth = auth;
	$scope.sites = sites;

	$scope.save = function(data){
		Query.create(data, auth, function(){
			//$location.path('/search');
		});
	};

	$scope.$on('queryCreate:success', function(value){
		$location.path('/search');
	});
});

app.controller('SessionCtrl', function ($scope, $location, auth) {
	$scope.auth = auth;

  $scope.$on("$firebaseAuth:login", function(e, user) {
  	$location.path('/search');
	});
});

app.controller('NavCtrl', function ($scope, $location, Auth) {
	Auth.resolve().then(function(data){
		$scope.auth = data;
	});

	$scope.$on("$firebaseAuth:logout", function(e, user) {
  	$location.path('/');
	});
});
