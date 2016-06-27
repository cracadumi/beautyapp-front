/**
 * @ngdoc controller
 * @name MapCtrl
 *
 * @description
 */

angular.module('starter')
  .controller('MapCtrl', function($q, $rootScope, $scope, $ionicLoading, $compile, uiGmapGoogleMapApi, $http) {

    //var DEFAULT_MAP_LOC = new google.maps.LatLng(43.07493,-89.381388);
    $scope.location = '';


    $scope.map = {
      windowTemplate: "templates/marker-template.html",
      windowParameter: function(marker){
        return marker;
      },
      windowOptions: {
        boxClass: "infobox"
        /*boxStyle: {
          backgroundColor: "#f9f9f9",
          border: "2px solid d9d9d9"
        }*/
      },
      center: {
        latitude: 51.844943699999995,
        longitude: 4.3069723
      },
      options: {
        zoomControl: false,
        minZoom: 13,
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
      var deferred = $q.defer();
      $ionicLoading.show({showBackdrop: false});
      navigator.geolocation.getCurrentPosition(function(pos) {
        deferred.resolve(pos);
        $ionicLoading.hide();
      }, function(error) {
        console.error('Unable to get location: ' + error.message);
        $ionicLoading.hide();
      });


      //TODO remove this test code when done
      /*var fd = new FormData();
      fd.append('user[role]','user');
      fd.append('user[password]','31q2w3e4r');
      fd.append('user[email]','3em3@il.ru');
      fd.append('user[name]','3Name');
      fd.append('user[surname]','3Surname');
      fd.append('user[username]','3sulyanoff3');
      $http.post('http://beautyapp.herokuapp.com/api/v1/registrations.json', fd, {
        //transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .success(function(data){
          console.log(data);
        })
        .error(function(e){
          console.log(e);
        });
*/
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
        $scope.map.markers.push({
          id: '123',
          show: true,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          coords: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          },
          options: {
            icon: './img/bluedot32.png'
          }
        });
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
        id: '123',
        show: true,
        latitude: location.geometry.location.lat(),
        longitude: location.geometry.location.lng(),
        coords: {
          latitude: location.geometry.location.lat(),
          longitude: location.geometry.location.lng()
        },
        options: {
          //icon:
          // 'https://2.bp.blogspot.com/-fQuA-G2XLw8/VX4TFzAtVeI/AAAAAAAAB-w/-MWtUdnzOAw/s1600/BlueDot64.png'
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
