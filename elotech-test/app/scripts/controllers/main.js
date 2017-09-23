'use strict';

/**
 * @ngdoc function
 * @name elotechApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the elotechApp
 */
angular.module('elotechApp')
  .controller('MainCtrl', function ($route, $scope) {
    
    var self = this;

    $scope.$on('$routeChangeSuccess', function () {
		self.route = $route.current.controllerAs;
	});

	// run
    (function () {
		$http.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';
    });

  });
