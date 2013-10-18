'use strict';
var app = angular.module('pattyApp');

app.service('Yql', function($http){
	this.craigslistSearch = function(search){
		var params = {
			callback: 'JSON_CALLBACK',
			format: 'json',
			env: 'store://datatables.org/alltableswithkeys',
			q: yqlQuery(search)
		};

		var query = $http.jsonp('http://query.yahooapis.com/v1/public/yql', {params:params});

		return query;
	};

	var yqlQuery = function(search){
		return "select * from craigslist.search WHERE location=\"" + search.location + "\" and type=\"sss\" and query=\"" + search.query + "\"";
	};

});