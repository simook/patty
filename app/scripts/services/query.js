'use strict';
var app = angular.module('pattyApp');

app.service('Query', function($rootScope, $http, $routeParams, Firebase, angularFireCollection, $q, angularFire, $location, Yql, $timeout){
	this.create = function(data){
		var query = userSearchesRef().push(),
		data = $.extend({}, angular.copy(data), {url: query.toString(), id: query.name(), created: Date.now()});
		query.set(data, onComplete);
	};

	this.remove = function(id){
		$rootScope.searches = _.omit($rootScope.searches, id);
		reset();
	};

	this.list = function(){
		var dfr = $q.defer();

		angularFire(userSearchesRef(), $rootScope, 'searches').then(function(data){
			dfr.resolve();
		});

		return dfr.promise;
	};

	this.check = function(){
		if($routeParams && $routeParams.search){
			var search = find($routeParams.search);
			if(search){
				$rootScope.selected = search;
			}
		}
	};

	this.run = function(id){
		var search = find(id);

		runQueries(search).then(function(results){
			search.results = results;
			search.resultsCount = _.reduce(results, function(m, r){
				if(_.isEmpty(r.results)) return m + 0;
				return m + r.results.length;
			}, 0);
		});
	};

	this.removeResult = function(id, result){
		var search = find(id);
		search.results.splice(search.results.indexOf(result),1);
	};

	this.removeResults = function(id){
		var search = find(id);
		search.results = false;
		search.resultsCount = false;
	};

	var reset = function(){
		$rootScope.selected = false;
		$location.path('search');
	};

	var find = function(id){
		return _.find($rootScope.searches, function(search){
			return (search.id === id);
		});
	};

	var onComplete = function(error){
		if(error){
			$rootScope.$broadcast('queryCreate:error', error);
		} else {
			reset();
			$rootScope.$broadcast('queryCreate:success', true);
		}
	};

	var userRef = function(){
		return Firebase.child('users').child($rootScope.authUser.id);
	};

	var userSearchesRef = function(){
		return userRef().child('searches');
	};

	var runQueries = function(search){
		var results = [], dfr = $q.defer();

		_.each(mapQueries(search), function(query, index, list){
			Yql.craigslistSearch(query)
			.success(function(data){
				results.push(resultMeta(query, data));
			})
			.error(function(data){
				console.log(data);
			})
			.then(function(data){
				if(index === (list.length-1)){
					dfr.resolve(results);
				}
			});
		});

		return dfr.promise;
	};

	var mapQueries = function(search){
		var queries = [];

		_.each(search.locations, function(location){
			_.each(search.items, function(item){
				queries.push({location:location, query:item.query});
			});
		});

		return queries;
	};

	var resultMeta = function(query, data){
		if(_.isEmpty(data.query.results)){
			return {
				query: query,
				results: false,
				created: data.query.created
			}
		} else {
			return {
				query: query,
				results: data.query.results.RDF.item,
				link: data.query.results.RDF.link,
				created: data.query.created
			};
		}
	};
});