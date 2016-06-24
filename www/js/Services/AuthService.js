/**
 * Created by oleg on 6/23/16.
 */

angular.module("starter")
  .service("AuthService", [
    "$q",
    "$http",
    "$localStorage",
    "$ionicLoading",
    "$ionicPopup",
    "CONFIG",
    function ($q,
              $http,
              $ionicLoading,
              $ionicPopup,
              CONFIG) {


      var API_URL = CONFIG.API_BASE;

      var register = function (User) {
        return $q(function (resolve, reject) {
          $http.post(API_URL + "/api/v1/", User).then(function (res) {

            //storeUser(res.data);
            resolve(res.data);
          }, function (error) {
            console.log("*** error : " + angular.toJson(error));
            var msg;
            if (error.data && error.data.code === "ConflictError") {
              msg = "duplicate";
            }
            reject(msg);
          });
        });
      };
      return {
        register: register
      }
    }]);
