'use strict';
var app = angular.module('pattyApp');

app.service('Auth', function ($firebaseAuth, FIREBASE) {
	var auth = $firebaseAuth(FIREBASE);

	this.resolve = function () {
		return auth;
	};

});
