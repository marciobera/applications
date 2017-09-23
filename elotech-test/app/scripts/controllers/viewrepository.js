'use strict';

/**
 * @ngdoc function
 * @name elotechApp.controller:ViewrepositoryCtrl
 * @description
 * # ViewrepositoryCtrl
 * Controller of the elotechApp
 */
angular.module('elotechApp')
  .controller('ViewrepositoryCtrl', function ($http, $route, DSP_URL, $routeParams) {
    
    var self = this;
    self.this = {name: $routeParams.id};
    self.loading = false;
    self.privacity = ['Público', 'Privado'];

    // methods

    var _getRepositoryById = function(){
        
    	self.loading = true;

    	$http.get(DSP_URL + '/repos/octokit/' + self.this.name).then(function(response){
			
			self.loading = false;
	    	if(response.data){
	    		self.this = response.data;
	    	}
	    });
    }

    // run

    (function () {
        _getRepositoryById();
    });
    $(function () {
	  $('[data-toggle="tooltip"]').tooltip();
	});


  });
