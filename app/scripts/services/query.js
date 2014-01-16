'use strict';
var app = angular.module('pattyApp');

app.service('Query', function($firebase, $rootScope, $q, FIREBASE, Yql, Results){
	var ref = $firebase(FIREBASE);
	var sitesData = [
		{id: "craigslist", title: "Craigslist", logo: "images/craigslist_logo.png"},
		{id: "equipmentTrader", title: "Equipment Trader", logo: "images/equipmentTrader_logo.png"}
	];

	this.resolve = function(auth){
		return ref.$child('users').$child(auth.id);
	};

	this.create = function(data, auth, callback){
		var item = ref.$child('users').$child(auth.id).$child('queries').$add();
		var data = $.extend({}, angular.copy(data), {id: item.name(), created: Date.now()});
		item.set(data, onComplete(false, callback));
	};

	this.run = function(item){
		return runQueries(item).then(function(results){
			item.results = results;
			item.resultsCount = _.reduce(results, function(m, r){
				if(_.isEmpty(r.results)) return m + 0;
				return m + r.results.length;
			}, 0);
			return item;
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

	this.sites = function(){
		var dfr = $q.defer();
		dfr.resolve(sitesData);
		return dfr.promise;
	};

	var onComplete = function(error, callback){
		if(error){
			$rootScope.$broadcast('queryCreate:error', error);
		} else {
			$rootScope.$broadcast('queryCreate:success', true);
		}

		if(typeof callback === 'function'){
			callback(true);
		}
	};

	var runQueries = function(search){
		var results = [], dfr = $q.defer();

		_.each(mapQueries(search), function(query, index, list){
			Yql[query.site](query)
			.then(function(res){
				results.push(Results[query.site](query, res.data));
			})
			.then(function(res){
				if(index === (list.length-1)){
					dfr.resolve(results);
				}
			});
		});

		return dfr.promise;
	};

	var mapQueries = function(search){
		var queries = [];

		_.each(_.keys(search.sites), function(site){
			_.each(search.locations, function(location){
				_.each(search.keywords, function(keyword){
					queries.push({site: site, location: angular.copy(location), keyword: keyword});
				});
			});
		});

		return queries;
	};
});