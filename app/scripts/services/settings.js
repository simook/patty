'use strict';
var app = angular.module('pattyApp');

app.service('Settings', function($firebase, $rootScope, $q, FIREBASE){
	var ref = $firebase(FIREBASE);

	this.resolve = function(auth){
		return ref.$child('settings').$child(auth.id);
	};

	this.save = function(auth, key, data, callback){
		if(!auth || !key || !data){ return false; }
		ref.$child('settings').$child(auth.user.id).$child(key).$set(angular.copy(data), onComplete(false, callback));
	}

	var onComplete = function(error, callback){
		if(error){
			$rootScope.$broadcast('settingSave:error', error);
		} else {
			$rootScope.$broadcast('settingSave:success', true);
		}

		if(typeof callback === 'function'){
			callback(true);
		}
	};
});