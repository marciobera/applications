'use strict';

/**
 * @ngdoc function
 * @name eventsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eventsApp
 */
angular.module('eventsApp')
  .controller('MainCtrl', function ($http, $sce, $location, $rootScope, $cacheFactory, $cookies) {
  	var main = this;
    main.loading = false;
    main.cookies = $cookies;
    main.lastArtists = [];

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

      main._lastArtists();

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

      var _cacheArtist = $cookies.getObject(main.artist.name);

      if(_cacheArtist){
        main.artist.content = _cacheArtist;
        main.artist.content.facebook_iframe_url = main._getFacebookPageUrl(main.artist.content.facebook_page_url);
        main.loading = false;

        return false;
      }

    	$http.get(url + main.artist.name, config).
    	then(function(response){

        main.loading = false;
        main.artist.content = response.data;
        main.artist.content.facebook_iframe_url = main._getFacebookPageUrl(main.artist.content.facebook_page_url);

        $cookies.putObject(main.artist.name, response.data);

    	},function (error){
        // console.log(error);
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

      var _getCache = cache.get(main.artist.name);

      if(_getCache){
        main.artist.events = _getCache.events;
        main.loading = false;
        return false;
      }

      $http.get(url + main.artist.name + "/events", config)
      .then(function(response){
        console.log(response);
        
        main.loading = false;
        
        if(response.data.length > 0){
          
          main.artist.events = response.data;
          cache.put(main.artist.name, main.artist);

        }else{
          main.artist.error.code = 1;
          main.artist.error.type = 'warning';
          main.artist.error.message = '<strong>Sorry</strong>, no events were found for this artist. :(';
        }



      },
      function(error){
        // console.log(error);
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

    main._lastArtists = function(){

      main.lastArtists = [];
      var itens = main.cookies.getAll();
      delete itens._ga;
      delete itens._gid;
      delete itens._gat;

      angular.forEach(itens, function(item, key){
        item = JSON.parse(item);
        item.input = key;
        main.lastArtists.push(item);
        
      });
    }

    main._removeSearch = function(index){
      // console.log(main.lastArtists[index]);
      $cookies.remove(main.lastArtists[index].input);
      main.lastArtists.splice(index, 1);
    }

    main.clearSearch(0);

  });