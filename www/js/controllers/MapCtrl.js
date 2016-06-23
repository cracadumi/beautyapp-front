angular.module('starter')
  .controller('MapCtrl', function($q, $rootScope, $scope, $ionicLoading, $compile) {

    var DEFAULT_MAP_LOC = new google.maps.LatLng(43.07493,-89.381388);
    $scope.location = '';
    //Unhide tabbar navigating from signin/signup state
    $scope.$on('$ionicView.beforeEnter', function(e) {
      $rootScope.hideTabs = false;
    });

    function _getCurPosition() {
      var deferred = $q.defer();
      $ionicLoading.show({showBackdrop: false});
      navigator.geolocation.getCurrentPosition(function(pos) {
        deferred.resolve(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $ionicLoading.hide();
      }, function(error) {
        console.error('Unable to get location: ' + error.message);
        $ionicLoading.hide();
      });
      return deferred.promise;
    }

    var mapOptions = {
      center: DEFAULT_MAP_LOC,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      scaleControl: false,
      streetViewControl: false
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    _getCurPosition().then(function(latLng){


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
    });

    $scope.clickTest = function() {
      alert('Example of infowindow with ng-click')
    };

    /**************************************
     * This button will center the map on user's position
     * ***********************************/
    $scope.centerOnMe = function() {
      _getCurPosition().then(function(latLng){
        $scope.map.panTo(latLng);
      }, function(error){
        console.log("Could not get location");
      });
    };


  });
