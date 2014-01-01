'use strict';

angular.module('pattyApp', ['$strap.directives','firebase','ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/search/index.html',
        controller: 'SearchIndexCtrl',
        resolve: {
          auth: ['Auth', function (Auth) {
            return Auth.resolve();
          }]
          //searches: 'Searches'
        }
      })
      .when('/search/new', {
        templateUrl: 'views/search/new.html',
        controller: 'SearchNewCtrl',
        resolve: {auth:'Auth'}
      })
      .when('/search/:search', {
        templateUrl: 'views/search/index.html',
        controller: 'SearchIndexCtrl',
        resolve: {
          auth:'Auth',
          searches: 'Searches'
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FIREBASE', new Firebase("https://patty.firebaseio.com/"));
