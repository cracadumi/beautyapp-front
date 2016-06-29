/**
 * Created by oleg on 6/23/16.
 */

angular.module("starter")
  .service("AuthService", [
    "$q",
    "$http",
    "$ionicLoading",
    "$ionicPopup",
    "CONFIG",
    '$localStorage',
    function ($q,
              $http,
              $ionicLoading,
              $ionicPopup,
              CONFIG,
              $localStorage) {


      var API_URL = CONFIG.API_BASE;


var register = function (User) {
  return $q(function (resolve, reject) {
    $http.post(API_URL + "/api/v1/registrations.json", User).then(function (res) {

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

      var showUser = function(access_token){
        return $q(function (resolve, reject) {
          $http.get(API_URL + "/api/v1/me?access_token=" + access_token).then(function (res) {

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

      var signOut = function(access_token){
        return $q(function (resolve, reject) {
          $http.post(API_URL + "/oauth/revoke",{headers: {'Authorization':  'Bearer' + access_token}}).then(function (res) {

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

      var changePass = function(password,current_password){
        var fd = new FormData;
        fd.append('user[password]',password);
        fd.append('user[current_password]',current_password);
        return $q(function (resolve, reject) {
          $http.put(API_URL + "/api/v1/me?access_token=" + $localStorage.tokens.access_token ,fd,{
            headers: {'Content-Type': undefined}
          }).then(function (res) {
            //server response is empty by design
            resolve(res.data);
          }, function (error) {
            console.log("*** error : " + angular.toJson(error));
            reject(error);
          });
        });
      };

      return {
        register: register,
        showUser:showUser,
        signOut:signOut,
        changePass:changePass
      }
    }]);
