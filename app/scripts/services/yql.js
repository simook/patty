'use strict';
var app = angular.module('pattyApp');

app.service('Yql', function($http){
	this.craigslist = function(search){
		var params = {
			callback: 'JSON_CALLBACK',
			format: 'json',
			env: 'store://datatables.org/alltableswithkeys',
			q: yqlCraigslistQuery(search)
		};

		var query = $http.jsonp('http://query.yahooapis.com/v1/public/yql', {params:params});

		return query;
	};

	var yqlCraigslistQuery = function(search){
		return "select * from craigslist.search WHERE location=\"" + search.location.city + "\" and type=\"sss\" and query=\"" + search.keyword + "\"";
	};

});