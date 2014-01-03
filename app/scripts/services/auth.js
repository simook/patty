'use strict';
var app = angular.module('pattyApp');

app.service('Auth', function ($firebaseAuth, FIREBASE, $q, $rootScope) {
	var auth = $firebaseAuth(FIREBASE);
	var userData = null;

	this.resolve = function () {
		var dfr = $q.defer();
		console.log(auth);
		dfr.resolve(auth);
		return dfr.promise;
	};

	this.user = function () {
		var dfr = $q.defer();
		if(userData === null){
			$rootScope.$on("$firebaseAuth:login", function(e, data) {
				userData = data;
				dfr.resolve(userData);
			});
		} else {
			dfr.resolve(userData);
		}
		return dfr.promise;
	};
});
