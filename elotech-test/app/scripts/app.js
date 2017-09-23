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
    'angularMoment',
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
      .when('/repositories/:id', {
        templateUrl: 'views/viewrepository.html',
        controller: 'ViewrepositoryCtrl',
        controllerAs: 'viewRepository'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.hashPrefix('');
  });
