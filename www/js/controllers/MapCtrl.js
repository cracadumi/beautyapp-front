/**
 * @ngdoc controller
 * @name MapCtrl
 *
 * @description
 */

angular.module('starter')
  .controller('MapCtrl', function($q, $rootScope, $scope, $ionicLoading,$localStorage,$state, $compile, uiGmapGoogleMapApi, $http) {
    $scope.$on('$ionicView.beforeEnter', function (e) {
      console.log('hiding tabbar');
      $rootScope.hideTabs = true;
      if (!$localStorage.CurrentUser) {
        $state.go('tab.signin');
      }
      else{
        $scope.user = $localStorage.CurrentUser;
        $scope.user.created_at = $scope.user.created_at.substr(0,4) ;
      }

    });
    //var DEFAULT_MAP_LOC = new google.maps.LatLng(43.07493,-89.381388);
    $scope.location = '';


    $scope.map = {
      windowTemplate: "templates/marker-template.html",
      windowParameter: function(marker){
        return marker;
      },
      center: {
        latitude: 51.844943699999995,
        longitude: 4.3069723
      },
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
      $http.post('https://beautyapp.herokuapp.com/api/v1/registrations.json', fd, {
        //transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .success(function(data){
          console.log(data);
        })
        .error(function(e){
          console.log(e);
        });

      var fd = new FormData();
      fd.append('grant_type','password');
      fd.append('password','31q2w3e4r');
      fd.append('username','3em3@il.ru');
      $http.post('https://beautyapp.herokuapp.com/oauth/token', fd, {
        //transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
        .success(function(data){
          console.log(data);
        })
        .error(function(e){
          console.log(e);
        });*/

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
          zoom: 7,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        //current position marker
        $scope.map.markers.push({
          id: '1234',
          show: true,
          coords: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          },
          options: {
            icon: './img/bluedot32.png'
          },
          windowOptions: {
            visible: false,
            boxClass: "infobox",
            alignBottom: true
          }
        });

        //test butitian bubble
        $scope.map.markers.push({
          id: '123',
          show: true,
          coords: {
            latitude: 42.049575,
            longitude: -72.614299
          },
          options: {
            icon: './img/noimage.png'
          },
          windowOptions: {
            boxClass: "infobox",
            alignBottom: true,
            pixelOffset: new google.maps.Size(-120 , -30, 'px', 'px')
            /*,boxStyle: {
             backgroundColor: "#f9f9f9",
             border: "2px solid d9d9d9"
             }*/
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
          alignBottom: true,
          pixelOffset: new google.maps.Size(-120 , -30, 'px', 'px')
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
