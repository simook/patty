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
      .when('/search', {
        templateUrl: 'views/search/index.html',
        controller: 'SearchIndexCtrl',
        resolve: {
          auth: ['Auth', function (Auth) {
            return Auth.resolve();
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
            return Auth.resolve();
          }],
          list: ['Auth','Query', function (Auth, Query) {
            return Auth.user().then(function(data){
              return Query.resolve(data);
            });
          }]
        }
      })
      .when('/search/new', {
        templateUrl: 'views/search/new.html',
        controller: 'SearchNewCtrl',
        resolve: {
          auth: ['Auth', function (Auth) {
            return Auth.resolve();
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
  .constant('FIREBASE', new Firebase("https://patty.firebaseio.com/"));
