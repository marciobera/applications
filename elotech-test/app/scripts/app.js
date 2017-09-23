'use strict';

/**
 * @ngdoc overview
 * @name elotechApp
 * @description
 * # elotechApp
 *
 * Main module of the application.
 */
angular
  .module('elotechApp', [
    'ngRoute',
    'configApp'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/repositories', {
        templateUrl: 'views/repositories.html',
        controller: 'RepositoriesCtrl',
        controllerAs: 'repositories'
      })
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.hashPrefix('');
  });
