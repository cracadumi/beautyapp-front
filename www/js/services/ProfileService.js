angular.module("starter")
  .service("ProfileService", [
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


      var updateProfile = function (User) {
        var fd = new FormData;

        fd.append('user[bio]', User);
        return $q(function (resolve, reject) {
          $http.put(API_URL + "/api/v1/me?access_token=" + $localStorage.tokens.access_token,fd,{
            headers: {'Content-Type': undefined}
          }).then(function (res) {

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
      return{
        updateProfile:updateProfile
      }
    }])
