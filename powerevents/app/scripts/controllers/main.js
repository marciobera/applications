'use strict';

/**
 * @ngdoc function
 * @name eventsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eventsApp
 */
angular.module('eventsApp')
  .controller('MainCtrl', function ($http, $sce, $location, $rootScope, $cacheFactory) {
  	var main = this;
    main.loading = false;

    var cache = $cacheFactory('myCache');

    main.artist = {name: ''};

    main.currentController = null;

    $rootScope.$on('$routeChangeStart', function(event, next){
      
      main.currentController = next.$$route.controllerAs;

    });

    var url = "https://rest.bandsintown.com/artists/";

    var config = {
            params:{
             "app_id":"vanhack_challange"
            },
            cache: cache
        };

    // methods

    main.clearSearch = function(name) {
      if(name){
        main.artist.name = '';
      }
      main.artist = {
        name: main.artist.name,
        content: [],
        events: [],
        error: 
          {
            code: 0,
            type: '',
            message: ''
          }
        };
    }

    main.getArtist = function(){
      main.loading = true;
      main.clearSearch(0);
      if(!main.artist.name){
        main.clearSearch(1);
        main.loading = false;
        return false;
      }

      var _getCache = cache.get(main.artist.name);

      if(_getCache){

        main.artist.content = _getCache;
        main.artist.content.facebook_iframe_url = main._getFacebookPageUrl(main.artist.content.facebook_page_url);
        main.loading = false;
        return false;

      }

    	$http.get(url + main.artist.name, config).
    	then(function(response){

        cache.put(main.artist.name, response.data);
        console.log(response);
        main.loading = false;
        main.artist.content = response.data;
        main.artist.content.facebook_iframe_url = main._getFacebookPageUrl(main.artist.content.facebook_page_url);

    	},function (error){
        console.log(error);
        main.loading = false;
        main.artist.error.code = 1;
        main.artist.error.type = 'danger';
        main.artist.error.message = '<strong>Sorry</strong>, <em>' + main.artist.name + '</em> was not found. :(';
      });
    }

    main.getNextEvents = function(){

      

      main.loading = true;
      main.artist.events = [];
      if(!main.artist.name){
        main.artist.error.code = 1;
        main.artist.error.type = 'warning';
        main.artist.error.message = '<strong>Please</strong>, set the artist name.';
        main.loading = false;
        return false;
      }

      var _getCache = cache.get(main.artist.name + "/events");

      if(_getCache){
        main.artist.events = _getCache;
        main.loading = false;
        return false;
      }

      $http.get(url + main.artist.name + "/events", config)
      .then(function(response){
        
        main.loading = false;
        cache.put(main.artist.name + "/events", response.data);

        if(response.data.length > 0){
          main.artist.events = response.data;
        }else{
          main.artist.error.code = 1;
          main.artist.error.type = 'warning';
          main.artist.error.message = '<strong>Sorry</strong>, no events were found for this artist. :(';
        }
        
      },
      function(error){
        console.log(error);
        main.loading = false;
        main.artist.error.code = 1;
        main.artist.error.type = 'warning';
        main.artist.error.message = '<strong>Sorry</strong>, no events were found for this artist. :(';
      });

    }

    main._getFacebookPageUrl = function(url){
      if(url){
        return $sce.trustAsResourceUrl(
            "https://www.facebook.com/plugins/like.php?href=" + main.artist.content.facebook_page_url + "&width=300&layout=standard&action=like&size=small&show_faces=false&share=false&height=40&appId=433250860343994&colorscheme=dark"
            );
      }
    }

    main.clearSearch(0);

  });