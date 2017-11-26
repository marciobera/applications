'use strict';

/**
 * @ngdoc function
 * @name eventsApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the eventsApp
 */
angular.module('eventsApp')
  .controller('ContactCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var main = $scope.$parent.$parent.main;

    main.clearSearch(0);
  });
