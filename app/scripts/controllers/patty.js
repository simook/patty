'use strict';

var app = angular.module('pattyApp');

app.controller('ResultsIndexCtrl', function ($scope, $interval, $timeout, auth, list, settings, Query, Settings) {
	$scope.auth = auth;
	$scope.list = list;
	$scope.settings = settings;

	$scope.$watch('list.searches', function(list){
		if(!list){ $scope.queryCount = 0; return false; }
		
		$scope.queryCount = _.reduce(_.keys(list), function(count, key){
			return list[key].meta.enabled ? count + 1 : count;
		}, 0);

		$scope.resultsCount = _.reduce(_.keys(list), function(count, key){
			return list[key].meta.enabled && list[key].resultsCount ? count + list[key].resultsCount : count;
		}, 0);
	}, true);

	$scope.$watch('settings.interval', function(interval){
		if(!interval){ return false; }
		$interval($scope.startSearching(), interval);
	});


	$scope.startSearching = function(){
		console.log('running search');
		$scope.nextTime = Date.now() + $scope.settings.interval;
		angular.forEach($scope.list.searches, function(item, key){
			if(item.meta.enabled) {
				Query.run(item).then(function(data){
				});
			}
		});
	};


	$scope.calculateDelay = function(interval){
		return (interval.power * interval.ms);
	};

	$scope.saveSetting = function(key, data){
		Settings.save(auth, key, data);
	};
});

app.controller('QueryIndexCtrl', function ($scope, auth, list, Query) {
	$scope.auth = auth;
	$scope.list = list;

	$scope.$watch('list.searches', function(list){
		if(!list){ $scope.queryCount = 0; return false; }
		$scope.queryCount = _.keys(list).length;
	}, true);

	$scope.deleteItem = function(id){
		list.$remove('searches/' + id);
		$scope.selected = null;
	};
});

app.controller('QueryNewCtrl', function ($scope, $location, auth, sites, Query) {
	$scope.auth = auth;
	$scope.sites = sites;

	$scope.save = function(data){
		Query.create(data, auth, function(){
			//$location.path('/search');
		});
	};

	$scope.$on('queryCreate:success', function(value){
		$location.path('/queries');
	});
});

app.controller('SessionCtrl', function ($scope, $location, auth) {
	$scope.auth = auth;

  $scope.$on("$firebaseAuth:login", function(e, user) {
  	$location.path('/queries');
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
