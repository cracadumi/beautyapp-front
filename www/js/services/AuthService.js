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
    '$state',
    function ($q,
              $http,
              $ionicLoading,
              $ionicPopup,
              CONFIG,
              $localStorage,
              $state) {


      var API_URL = CONFIG.API_BASE;


      var register = function (User) {
        User.email.toLowerCase();
        var fd = new FormData();
        fd.append('user[role]',"user");
        fd.append('user[password]',User.password);
        fd.append('user[email]',User.email);
        fd.append('user[name]',User.name);
        fd.append('user[surname]',User.surname);
        fd.append('user[username]','@' + User.username);
        return $q(function (resolve, reject) {
          $http.post(API_URL + "/api/v1/registrations.json", fd, {
            headers: {'Content-Type': undefined}
          }).then(function (res) {
            login(User).then(function (userData) {
              resolve(userData);
            }, function (err) {
              console.log('*** login error while registering: ' + angular.toJson(err));
              reject(error);
            });
          }, function (error) {
            console.log('*** register error: ' + angular.toJson(error));
            reject(error.data);
          });
        });
      };

      var login = function (User) {
        User.email.toLowerCase();
        var fd = new FormData();
        fd.append('grant_type', 'password');
        fd.append('username', User.email);
        fd.append('password', User.password);
        return $q(function (resolve, reject) {
          $http.post(API_URL + "/oauth/token", fd, {
            headers: {'Content-Type': undefined}
        }).then(function (res) {
            var access_token = res.data.access_token;
            $localStorage.tokens = res.data;
            showUser(access_token).then(function (user) {
              $localStorage.CurrentUser = user;
              resolve(res.data);
            }, function (error) {
              reject(error);
            });

          }, function (error) {
            reject(error);
          });
        });
      };

      var showUser = function (access_token) {
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

      var signOut = function (access_token) {
        return $q(function (resolve, reject) {
          $http.post(API_URL + "/oauth/revoke", {headers: {'Authorization': 'Bearer' + access_token}}).then(function (res) {

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

      var changePass = function (password, current_password) {
        var fd = new FormData;
        fd.append('user[password]', password);
        fd.append('user[current_password]', current_password);
        return $q(function (resolve, reject) {
          $http.put(API_URL + "/api/v1/me?access_token=" + $localStorage.tokens.access_token, fd, {
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
      var registerFB = function (User) {
        //console.log("**** FB user: " + angular.toJson(User));
        return $q(function (resolve, reject) {
          $http.post(API_URL + "/api/v1/registrations.json", User, {headers: {'Content-Type': undefined}}).then(function (res) {

            resolve(res.data);
            $state.go("tab.map");
          }).catch(function (error) {
            //console.log("*** error : " + angular.toJson(error));
            $ionicLoading.hide();
            console.log(error);
            if (error.data.errors.email == "has already been taken" || error.status) {
              var showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                  title: "Email already taken",
                  template: "Please sign"
                })
              };
              showAlert();
            }

            //
          });
        });
      };

      var SignInFB = function (request) {
        return $q(function (resolve, reject) {
          $http.post(API_URL + "/oauth/token", request, {headers: {'Content-Type': undefined}}).then(function (res) {

            resolve(res);
            //$state.go("tab.map");
          }).catch(function (error) {
            console.log("*** error2 : " + angular.toJson(error));
            if(error.status == "401"){
              var showAlert = function() {
                var alertPopup = $ionicPopup.alert({
                  title: "Beautyapp",
                  template: "You not registered with facebook account"
                })};

              showAlert();
            }
            $ionicLoading.hide();


            //
          });
        });
      };

      return {
        register: register,
        login: login,
        showUser: showUser,
        signOut: signOut,
        changePass: changePass,
        registerFB: registerFB,
        SignInFB:SignInFB
      }
    }]);
