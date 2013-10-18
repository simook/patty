'use strict';

angular.module('pattyApp', ['$strap.directives','firebase'])
  .config(function ($routeProvider) {
    $routeProvider
      //.when('/', {
      //  templateUrl: 'views/main.html',
      //  controller: 'MainCtrl',
      //  resolve: {auth:'Auth'}
      //})
      .when('/search', {
        templateUrl: 'views/search/index.html',
        controller: 'SearchIndexCtrl',
        resolve: {
          auth:'Auth',
          searches: 'Searches'
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
        redirectTo: '/search'
      });
  })
  .constant('Firebase', new Firebase("https://patty.firebaseio.com/"));
