angular.module("starter")
  .service("MarkerService", [
    "$q",
    "$http",
    "$ionicLoading",
    "$ionicPopup",
    "CONFIG",
    '$cordovaGeolocation',
    function ($q,
              $http,
              $ionicLoading,
              $ionicPopup,
              CONFIG,
              $cordovaGeolocation) {

      var API_URL = CONFIG.API_BASE;

      function _getRandomNum() {
        return parseFloat((Math.random() * (0.00 - 0.009) + 0.009).toFixed(3));
      }

      var parseLocation = function (location) {
        if(location.geometry){
          return {
            latitude: location.geometry.location.lat(),
            longitude: location.geometry.location.lng()
          };
        } else if(location.coords){
          return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };
        }
      };

      function _getCurPosition() {
        var deferred = $q.defer();
        $ionicLoading.show({showBackdrop: false});
        var posOptions = {timeout: 10000, enableHighAccuracy: true};
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

      var getCurrentPositionMarker = function () {
        return $q(function (resolve, reject) {
          _getCurPosition().then(function(pos){
            resolve({
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
            });
          }, function(error){
            reject({});
          });
        });
      };

      var getMarkersNearPosition = function (location) {
        var markers = [];
        for(var i = 0; i < 3; i++) {
          markers.push({
            id: i,
            show: true,
            coords: {
              latitude: parseFloat((parseFloat(location.geometry.location.lat()) - _getRandomNum()).toFixed(7)),
              longitude: parseFloat((parseFloat(location.geometry.location.lng()) - _getRandomNum()).toFixed(7))
            },
            options: {
              icon: './img/noimage.png'
            },
            windowOptions: {
              boxClass: "infobox",
              //alignBottom: true,
              pixelOffset: new google.maps.Size(-120 , -185, 'px', 'px')
            }
          });
        }
        return $q(function (resolve, reject) {

          resolve(markers);

        });
      };

      return{
        parseLocation: parseLocation,
        getMarkersNearPosition: getMarkersNearPosition,
        getCurrentPositionMarker: getCurrentPositionMarker
      }
    }]);
