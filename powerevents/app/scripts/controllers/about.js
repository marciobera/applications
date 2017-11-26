'use strict';

/**
 * @ngdoc function
 * @name eventsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the eventsApp
 */
angular.module('eventsApp')
  .controller('AboutCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var main = $scope.$parent.main;

    main.clearSearch(0);
  });
