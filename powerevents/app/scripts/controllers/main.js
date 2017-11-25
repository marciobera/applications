'use strict';

/**
 * @ngdoc function
 * @name eventsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eventsApp
 */
angular.module('eventsApp')
  .controller('MainCtrl', function ($http, $sce, $location) {
  	var main = this;
    main.loading = false;

    main.artist = {name: ''};

    var url = "https://rest.bandsintown.com/artists/";

    var config = {
            params:{
             "app_id":"vanhack_challange"
            }
        };

    // methods

    main.clearSearch = function(name = false){
      main.artist = {name: main.artist.name, content: [], events: [], error: {code: 0, type: '', message: ''} };
      if(name){
        main.artist.name = '';
      }
    }
    main.getArtist = function(){
      main.loading = true;
      main.clearSearch(0);
      if(!main.artist.name){
        main.clearSearch(1);
        main.loading = false;
        return false;
      }
    	$http.get(url + main.artist.name, config).
    	then(function(response){
        console.log(response);
        main.loading = false;
        main.artist.content = response.data;
        if(main.artist.content.facebook_page_url){
          main.artist.content.facebook_iframe_url = $sce.trustAsResourceUrl(
            "https://www.facebook.com/plugins/like.php?href=" + main.artist.content.facebook_page_url + "&width=300&layout=standard&action=like&size=small&show_faces=false&share=false&height=40&appId=433250860343994&colorscheme=dark"
            );
        }
    	},function (error){
        main.loading = false;
        main.artist.error.code = 1;
        main.artist.error.type = 'danger';
        main.artist.error.message = '<strong>Sorry</strong>, <em>' + main.artist.name + '</em> was not found. :(';
      });
    }
    main.clearSearch(0);

  });