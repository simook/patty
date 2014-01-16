'use strict';
var app = angular.module('pattyApp');

app.service('Results', function(){
	this.craigslist = function(query, data){
		var results = noResults(query, data, data.query.results);

		if(!results){
			results = {
				query: query,
				results: data.query.results.RDF.item,
				link: data.query.results.RDF.link,
				created: data.query.created
			}
		}

		return results;
	};

	this.equipmentTrader = function(query, data){
		var results = noResults(query, data, data.query.results.postresult);

		if(!results){
			console.log(data);
		}

		return results;
	};

	var noResults = function(query, data, emptyString){
		if(_.isEmpty(emptyString) || data.error){
			return  {
				query: query,
				results: false,
				created: data.query.created
			}
		} else {
			return false;
		}
	};


});