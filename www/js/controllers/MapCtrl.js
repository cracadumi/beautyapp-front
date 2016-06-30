/**
 * @ngdoc controller
 * @name MapCtrl
 *
 * @description
 */

angular.module('starter')
  .controller('MapCtrl', function($q, $rootScope, $scope, $ionicLoading,$localStorage,$state, $compile, uiGmapGoogleMapApi, $http, $cordovaGeolocation) {
    $scope.$on('$ionicView.beforeEnter', function (e) {
      //console.log('hiding tabbar');
      //$rootScope.hideTabs = true;


    });
    var DEFAULT_MAP_LOC = new google.maps.LatLng(43.07493,-89.381388);
    $scope.location = '';

    $scope.map = {
      windowTemplate: "templates/tab-map-marker.html",
      windowParameter: function(marker){
        return marker;
      },
      center: DEFAULT_MAP_LOC,
      options: {
        zoomControl: false,
        minZoom: 5,
        maxZoom: 20,
        mapTypeControl: false,
        streetViewControl: false,
        draggable: true,
        panControl: false,
        optimized: true,
        mapTypeId: "roadmap",
        styles: [
        ]
      },
      zoom: 13,
      events: {}
    };

     $scope.map.markers = [];

    //Unhide tabbar navigating from signin/signup state
    $scope.$on('$ionicView.beforeEnter', function(e) {
      $rootScope.hideTabs = false;
    });

    //watch locatin changes to center map
    $scope.$watch('location', function(newVal, oldVal) {
      if(angular.isObject(newVal)){
        $scope.updateRequestLocation(newVal);
      }
    });


    function _getCurPosition() {
      /*var deferred = $q.defer();
      $ionicLoading.show({showBackdrop: false});
      navigator.geolocation.getCurrentPosition(function(pos) {
        deferred.resolve(pos);
        $ionicLoading.hide();
      }, function(error) {
        console.error('Unable to get location: ' + error.message);
        $ionicLoading.hide();
      });*/
      var deferred = $q.defer();
      $ionicLoading.show({showBackdrop: false});
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (pos) {
          deferred.resolve(pos);
          $ionicLoading.hide();
        }, function(error) {
          console.error('Unable to get location: ' + error.message);
          $ionicLoading.hide();
        });

      return deferred.promise;
    }

    $scope.clickTest = function() {
      alert('Example of infowindow with ng-click')
    };

    /**
     * @ngdoc function
     * @name MapCtrl#centerOnMe
     *
     * @description
     * Centers map on user's current location and adds marker
     *
     * @returns {undefined} does not return anything
     */
    $scope.centerOnMe = function() {
      _getCurPosition().then(function(pos){
        $scope.map.center = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };

        //test butitian bubble
        $scope.map.markers.push({
          id: '123',
          show: true,
          coords: {
            latitude: 42.049735,
            longitude: -72.611484
          },
          options: {
            //icon: './img/noimage.png'
          },
          windowOptions: {
            boxClass: "infobox",
            //alignBottom: true,
            pixelOffset: new google.maps.Size(-120 , -185, 'px', 'px')
          }
        });

        //current position marker
        $scope.curentPosition = [{
          id: '1234',
          show: true,
          coords: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          },
          options: {
            //icon: './img/noimage.png'
          },
          windowOptions: {
            boxClass: "cur-position",
            //alignBottom: true,
            pixelOffset: new google.maps.Size(-16 , -16, 'px', 'px')
          },
          windowTemplate: "templates/tab-map-marker-current-pos.html",
          windowParameter: function(marker){
            return marker;
          }
        }];


      }, function(error){
        console.log("Could not get location");
      });
    };

    /**
     * @ngdoc function
     * @name MapCtrl#updateRequestLocation
     * @kind function
     *
     * @description
     * Centers map on passed in location and adds marker
     *
     * @param {Object} location Location object that contains long and lat
     *
     * @returns {undefined} does not return anything
     */
    $scope.updateRequestLocation = function(location) {
      $scope.map.center = {
        latitude: location.geometry.location.lat(),
        longitude: location.geometry.location.lng()
      };
      $scope.map.markers.push({
        id: '12323456',
        show: true,
        coords: {
          latitude: location.geometry.location.lat(),
          longitude: location.geometry.location.lng()
        },
        options: {
          icon: './img/noimage.png'
        },
        windowOptions: {
          boxClass: "infobox",
          //alignBottom: true,
          pixelOffset: new google.maps.Size(-120 , -185, 'px', 'px')
          /*,boxStyle: {
           backgroundColor: "#f9f9f9",
           border: "2px solid d9d9d9"
           }*/
        }
      });
      //TODO call api to update request location
    };

    //chenter map on current location on page load
    $scope.centerOnMe();

    $scope.markerClick = function(marker) {
      if(marker.show) {
        marker.show = false;
      } else {
        _.forEach($scope.markers, function(curMarker) {
          curMarker.show = false;
        });
        marker.show = true;
      }
    };

    $scope.markerClose = function(marker) {
      marker.show = false;
    };

  });
