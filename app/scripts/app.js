'use strict';

angular.module('pattyApp', ['$strap.directives','firebase','ngRoute','ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/auth.html',
        controller: 'SessionCtrl',
        resolve: {
          auth: ['Auth', function (Auth) {
            return Auth.resolve();
          }]
        }
      })
      .when('/queries', {
        templateUrl: 'views/queries/index.html',
        controller: 'QueryIndexCtrl',
        resolve: {
          auth: ['Auth', function (Auth) {
            return Auth.user();
          }],
          list: ['Auth','Query', function (Auth, Query) {
            return Auth.user().then(function(data){
              return Query.resolve(data);
            });
          }]
        }
      })
      .when('/results', {
        templateUrl: 'views/results/index.html',
        controller: 'ResultsIndexCtrl',
        resolve: {
          auth: ['Auth', function (Auth) {
            return Auth.user();
          }],
          list: ['Auth','Query', function (Auth, Query) {
            return Auth.user().then(function(data){
              return Query.resolve(data);
            });
          }],
          settings: ['Auth','Settings', function (Auth, Settings) {
            return Auth.user().then(function(data){
              return Settings.resolve(data);
            });
          }]
        }
      })
      .when('/queries/new', {
        templateUrl: 'views/queries/new.html',
        controller: 'QueryNewCtrl',
        resolve: {
          auth: ['Auth', function (Auth) {
            return Auth.user();
          }],
          sites: ['Query', function (Query) {
            return Query.sites();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FIREBASE', new Firebase("https://patty.firebaseio.com/"))
  .constant('YQL', 'http://query.yahooapis.com/v1/public/yql');
