/**
 * @ngdoc controller
 * @name MapCtrl
 *
 * @description
 */

angular.module('starter')
  .controller('MapCtrl', function($q, $rootScope, $scope, $ionicPlatform, $timeout,$localStorage, $ionicLoading, $state, uiGmapGoogleMapApi, $http, $cordovaGeolocation, MarkerService) {
    $scope.$on('$ionicView.beforeEnter', function (e) {
      //console.log('hiding tabbar');
      //$rootScope.hideTabs = true;


    });
    var DEFAULT_MAP_LOC = new google.maps.LatLng(43.07493,-89.381388);
    $scope.location = '';

    $scope.curentPosition = [];
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
    $timeout(function () {
      console.log($localStorage.FBtoken);
    }, 18000);
    //Unhide tabbar navigating from signin/signup state
    $scope.$on('$ionicView.beforeEnter', function(e) {
      $rootScope.hideTabs = false;
    });

    //watch location changes to center map
    //need this to be on rootScope level because searchbar is outside
    //of this scope
    $rootScope.$watch('location', function(newVal, oldVal) {
      if(angular.isObject(newVal)){
        $scope.updateRequestLocation(newVal);
      }
    });

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
      MarkerService.getCurrentPositionMarker().then(function (curPosMarker) {
        $scope.map.center = MarkerService.parseLocation(curPosMarker);
        $scope.curentPosition[0] = curPosMarker;
        MarkerService.getMarkersNearPosition(curPosMarker).then(function (markers) {
          $scope.map.markers = markers;
        });
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
      $scope.map.center = MarkerService.parseLocation(location);
      MarkerService.getMarkersNearPosition(location).then(function (markers) {
        $scope.map.markers = markers;
      });
    };

    //chenter map on current location on page load
    $ionicPlatform.ready(function () {
      $scope.centerOnMe();
    });

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
