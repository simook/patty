'use strict';
var app = angular.module('pattyApp');

app.factory('Auth', function($rootScope, Firebase, angularFireAuth, $q){
  angularFireAuth.initialize(Firebase, {scope: $rootScope, name: "authUser"});

  var resolve = function(){
    var dfr = $q.defer();

    if($rootScope.authUser && $rootScope.authUser.id){
      dfr.resolve($rootScope.authUser);
    }

  	$rootScope.$on("angularFireAuth:login", function(evt, user) {
  		console.log(evt, user);
  		dfr.resolve(user);
		});

		$rootScope.$on("angularFireAuth:error", function(evt, error) {
			console.log(evt, error);
			dfr.reject(error);
		});

		return dfr.promise;
  };

  var register = function(user){
  	angularFireAuth.createUser(user.email, user.password)
  };

  var login = function(user){
  	angularFireAuth.login('password', user)
  };

  var logout = function(user){
  	angularFireAuth.logout();
  };

  return {
  	resolve: resolve,
  	register: register,
  	login: login,
  	logout: logout
  };
});
