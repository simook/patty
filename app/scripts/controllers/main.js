'use strict';
var app = angular.module('pattyApp');

app.controller('MainCtrl', function ($scope, auth) {
  auth.resolve();
});


app.controller('SessionCtrl', function ($scope, Auth) {
  $scope.user = {};

  $scope.login = function(data){
  	Auth.login(data);
  };

  $scope.register = function(data){
  	Auth.register(data);
  };

  $scope.logout = function(data){
  	Auth.logout();
  };
});
