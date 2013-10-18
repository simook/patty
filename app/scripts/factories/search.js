'use strict';
var app = angular.module('pattyApp');

app.factory('Searches', function($rootScope, $q, Query){
  var resolve = function(){
    var dfr = $q.defer();

    Query.list().then(function(){
    	Query.check();
    	dfr.resolve();
    });

    return dfr.promise;
  };

  $rootScope.$on('$routeChangeSuccess', function(next, current) {
  	if(current.params && current.params.search){
  		Query.check();
  	}
  });

  return { resolve: resolve };
});
