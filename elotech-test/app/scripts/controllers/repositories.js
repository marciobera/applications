'use strict';

/**
 * @ngdoc function
 * @name elotechApp.controller:RepositoriesCtrl
 * @description
 * # RepositoriesCtrl
 * Controller of the elotechApp
 */
angular.module('elotechApp')
  .controller('RepositoriesCtrl', function ($http, DSP_URL) {

  	var self = this;
  	self.all = [];
  	self.loading = false;
   

    //methods

    var _getRepositories = function(){
    	self.loading = true;

		$http.get(DSP_URL + '/orgs/octokit/repos').then(function(response){
			// console.log(response);
			self.loading = false;
	    	if(response.data.length > 0){
	    		self.all = response.data;
	    	}
	    });

    }


	// run

    (function () {
    	_getRepositories();
    });


  });
