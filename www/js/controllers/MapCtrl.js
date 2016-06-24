angular.module('starter')
  .controller('MapCtrl', function($q, $rootScope, $scope, $ionicLoading, $compile, uiGmapGoogleMapApi) {

    //var DEFAULT_MAP_LOC = new google.maps.LatLng(43.07493,-89.381388);
    $scope.location = '';

    /*uiGmapGoogleMapApi.then(function(map) {*/
    $scope.map = {
      "center": {
        "latitude": 51.844943699999995,
        "longitude": 4.3069723
      },
      "options": {
        "zoomControl": false,
        "minZoom": 13,
        "maxZoom": 20,
        "mapTypeControl": false,
        "streetViewControl": false,
        "draggable": true,
        "panControl": false,
        "optimized": true,
        "mapTypeId": "roadmap",
        "styles": [
          /*{
            "featureType": "poi",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },*/
          /*{
            "featureType": "road",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },*/
          /*{
            "featureType": "water",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },*/
          /*{
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },*/
          /*{
            "featureType": "landscape",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },*/
          /*{
            "featureType": "road.highway",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },*/
          /*{
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "visibility": "on"
              }
            ]
          },*/
          /*{
            "featureType": "road.arterial",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },*/
          /*{
            "featureType": "water",
            "stylers": [
              {
                "color": "#5f94ff"
              },
              {
                "lightness": 26
              },
              {
                "gamma": 5.86
              }
            ]
          },*/
          /*{
            "featureType": "road.highway",
            "stylers": [
              {
                "weight": 0.6
              },
              {
                "saturation": -85
              },
              {
                "lightness": 61
              }
            ]
          },*/
          /*{
            "featureType": "landscape",
            "stylers": [
              {
                "hue": "#0066ff"
              },
              {
                "saturation": 74
              },
              {
                "lightness": 100
              }
            ]
          }*/
        ]
      },
      "zoom": 13,
      "events": {},
      "clusterOptions": {
        "minimumClusterSize": 5,
        "styles": [
          {
            "height": 53,
            "url": "img/markers/cluster_marker_53.png",
            "width": 53
          },
          {
            "height": 56,
            "url": "img/markers/cluster_marker_56.png",
            "width": 56
          },
          {
            "height": 66,
            "url": "img/markers/cluster_marker_66.png",
            "width": 66
          }
        ]
      }
    };

     $scope.map.markers = [
        {
          "id": "50651",
          "latitude": 51.8477469,
          "longitude": 4.3141634,
          "title": "Zorgambulance met spoed naar W. Plokkerstraat in Spijkenisse",
          "distance": "585m",
          "hoofdcat": "70",
          "img": "http://snm-crm.nl/wealert/img/70/ambu_6_thumb.jpg?2u",
          "reactiecount": "0",
          "likecount": "1",
          "showWindow": true,
          "date": "2u",
          "options": {
            "labelContent": "&nbsp;&nbsp;&nbsp;585m<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2u",
            "labelAnchor": "0 0",
            "labelClass": "labelClass",
            "animation": google.maps.Animation.DROP
          }
        }
      ];


    /*});*/

    //Unhide tabbar navigating from signin/signup state
    $scope.$on('$ionicView.beforeEnter', function(e) {
      $rootScope.hideTabs = false;
    });

    function _getCurPosition() {
      var deferred = $q.defer();
      $ionicLoading.show({showBackdrop: false});
      navigator.geolocation.getCurrentPosition(function(pos) {
        deferred.resolve(pos);
        $ionicLoading.hide();
      }, function(error) {
        console.error('Unable to get location: ' + error.message);
        $ionicLoading.hide();
      });
      return deferred.promise;
    }
    /*var mapOptions = {
      center: DEFAULT_MAP_LOC,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      scaleControl: false,
      streetViewControl: false
    };*/

    //$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    /*_getCurPosition().then(function(latLng){


      //Wait until the map is loaded
      //google.maps.event.addListenerOnce($scope.map, 'idle', function(){

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

      var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
      var compiled = $compile(contentString)($scope);

      var infoWindow = new google.maps.InfoWindow({
        content: compiled[0]
      });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });

      $scope.map.panTo(latLng);

      //});
    }, function(error){
      console.log("Could not get location");
    });*/

    $scope.clickTest = function() {
      alert('Example of infowindow with ng-click')
    };

    /**************************************
     * This button will center the map on user's position
     * ***********************************/
    $scope.centerOnMe = function() {
      _getCurPosition().then(function(pos){
        $scope.map.center = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        $scope.map.markers.push({
          id: '123',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          options: {
            //icon:
            // 'https://2.bp.blogspot.com/-fQuA-G2XLw8/VX4TFzAtVeI/AAAAAAAAB-w/-MWtUdnzOAw/s1600/BlueDot64.png'
          }
        });
      }, function(error){
        console.log("Could not get location");
      });
    };


  });
