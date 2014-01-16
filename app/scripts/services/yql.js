'use strict';
var app = angular.module('pattyApp');

app.service('Yql', function($http, YQL){
	this.craigslist = function(search){
		var params = {
			callback: 'JSON_CALLBACK',
			format: 'json',
			env: 'store://datatables.org/alltableswithkeys',
			q: yqlCraigslistQuery(search)
		};

		return $http.jsonp(YQL, {params:params});
	};

	this.equipmentTrader = function(search){
		return equipmentTraderRedirectUri(search).then(function(res){
			var params = {
				callback: 'JSON_CALLBACK',
				format: 'json',
				env: 'store://datatables.org/alltableswithkeys',
				q: equipmentTraderQuery(res.data.query.results.result)
			};

			return $http.jsonp(YQL, {params:params});
		});
	};

	var yqlCraigslistQuery = function(search){
		return "select * from craigslist.search WHERE location=\"" + search.location.city + "\" and type=\"sss\" and query=\"" + search.keyword + "\"";
	};

	var equipmentTraderQuery = function(url){
		return "select * from html where url='http://www.equipmenttraderonline.com" + encodeURIComponent(url) + "' and xpath=\"//div[@id='listings_container']/div/div[contains(@class, 'result')]|//div[@id='pagineationSort_container']/h2/span[@class='resultsNum']|//div[@id='pagineationSort_container']/div/div[@class='pageNums']\""
	};

	var equipmentTraderRedirectUri = function(search){
		var oldUrl = encodeURIComponent("/RentalsOnly-false/Auctions-true/State-" + search.location.state + "/Keyword-" + search.keyword);

		return $http.jsonp(YQL, {
			params: {
				callback: 'JSON_CALLBACK',
				format: 'json',
				env: 'store://datatables.org/alltableswithkeys',
				q: "select * from html where url=\"http://www.equipmenttraderonline.com/ajax_search_redirect_supernova.php?oldURL=" + oldUrl + "\" and xpath='//html/body/p/text()'"
			}
		}).then(function(res){
			console.log(res);
			return $http.jsonp(YQL, {
				params: {
					callback: 'JSON_CALLBACK',
					format: 'json',
					env: 'store://datatables.org/alltableswithkeys',
					q: "use 'http://javarants.com/yql/javascript.xml' as j; select * from j where code='response.object = y.rest(\"http://www.equipmenttraderonline.com" + res.data.query.results + "\").followRedirects(false).get().headers.location'"
				}
			});
		});
	};

});