angular.module('starter')
  .controller('SignupCtrl', function ($rootScope, $scope, $state, $ionicLoading,
                                      transformRequestAsFormPost,$localStorage,
                                      $http,$ionicPopup,$ionicHistory,AuthService) {
    $scope.$on('$ionicView.beforeEnter', function (e) {
      console.log('hiding tabbar');
      $rootScope.hideTabs = true;


      $rootScope.hideTabs = true;
      //console.log()
      //if (!$localStorage.CurrentUser) {
      //  $state.go('tab.signin');
      //}
      //if($localStorage.CurrentUser){
      ////$scope.user = $localStorage.CurrentUser;
      ////$scope.user.created_at = $scope.user.created_at.substr(0,4) ;
      //  $state.go('tab.map');
      //}
    });

    $scope.signUpEmail = function () {
      $state.go('tab.signup-email');
    }
    $scope.goToLoginPage = function(){
      $state.go('tab.signin');
    }
    var startPage


    $scope.myGoBack = function() {
      $ionicHistory.goBack();
      console.log($ionicHistory.goBack.arguments);
    };
///Signup with Email
    $scope.user = {};
    $scope.confirmpass = "";
    $scope.isHandleAvailable = false;


    $scope.submitForm = function (isFormValid) {
      if (isFormValid) {
        $ionicLoading.show();
        var User = $scope.user;
        User.email.toLowerCase();


        var fd = new FormData();
        fd.append('user[role]',"user");
        fd.append('user[password]',User.password);
        fd.append('user[email]',User.email);
        fd.append('user[name]',User.name);
        fd.append('user[surname]',User.surname);
        fd.append('user[username]','@' + User.username);
        $http.post('http://beautyapp.herokuapp.com/api/v1/registrations.json', fd, {
            //transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          })
          .success(function(data){
            console.log(data);
            $ionicLoading.hide();
            var Popup = $ionicPopup.show({
              title:  'You have been successfully registered',
              scope: $scope,
              buttons: [
              { text: 'OK',
                type: 'button-positive',
                onTap: function(e){
                  $state.go("tab.map");
                }
              }
            ]
          });
          })
          .error(function(e){
            console.log(e.errors,e.errors.email);
            var error;
            $ionicLoading.hide();
            $scope.showAlert = function() {
              var alertPopup = $ionicPopup.alert({
                title: error,
                template: "Use another email"
              })};
            if(!!e.errors.email && e.errors.email == "has already been taken"){
              error = "user already has an account with this email";
              $scope.showAlert();
            }
            if(!!e.errors.username && e.errors.username == "has already been taken"){
              error = "user already has an account with this username";
              $scope.showAlert();
            }
          });
      }
    }

    $scope.connectToFB  = function(){
      if($rootScope.isWebView){
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Beautyapp',
            template: 'This feature only for mobile version'
          });

          alertPopup.then(function(res) {
          });
        };
        $scope.showAlert();
        return;
      }
      $ionicLoading.show();


      facebookConnectPlugin.login(["public_profile", "email", "user_friends"], function (result) {
        $rootScope.User = $scope.user;
        console.log("result", result);
        if ($rootScope.User) {
          User = {
            authResponse: result.authResponse
          };
        } else {
          //is registering with FB as a blogger
          $rootScope.User.authResponse = result.authResponse;
        }
        facebookConnectPlugin.api("/me?fields=email,id,name", null,
          function (response) {
            console.log("RESPONSE", response, response.authResponse);
            var arrNames = response.name.split(" ");
            $rootScope.User.first_name = arrNames[0];
            $rootScope.User.last_name = arrNames[arrNames.length - 1];
            $rootScope.User.email = response.email;
            $rootScope.User.accessToken = result.authResponse.accessToken;
            console.log("USERRRR", $rootScope.User)
            $ionicLoading.hide();
            $state.go('tab.signup-facebook');

          },function(error){
            console.log("*** [RegisterCtrl] error getting person info from Facebook: " + angular.toJson(error));
            // error
            $ionicLoading.hide();
            //var errorMsg = error.errorMessage ?
            //  error.errorMessage : error.error ?
            //  error.error : "There was a problem with Facebook login. Please try later";
            //if(errorMsg.indexOf('CONNECTION_FAILURE') !== -1) {
            //  errorMsg = CONSTANTS.MSG_NETWORK_UNAVAILABLE;
            //}
            //$scope.showAlert(errorMsg);
          });

      }, function (error) {
        console.log("*** [RegisterCtrl] error logging in with Facebook: " + angular.toJson(error));
        // error
        $ionicLoading.hide();
        //var errorMsg = error.errorMessage ?
        //  error.errorMessage : error.error ?
        //  error.error : "There was a problem with Facebook login. Please try later";
        //if(errorMsg.indexOf('CONNECTION_FAILURE') !== -1) {
        //  errorMsg = CONSTANTS.MSG_NETWORK_UNAVAILABLE;
        //}
        //$scope.showAlert(errorMsg);
      });
    }
$scope.facebookUser = {};
    $scope.submitFormFacebook = function (isFormValid) {
      console.log("!!!!!", $rootScope.User,$scope.facebookUser);
      var fd = new FormData();
      fd.append('user[role]',"user");
      fd.append('user[password]',$scope.facebookUser.password);
      fd.append('user[email]',$rootScope.User.email);
      fd.append('user[name]',$rootScope.User.first_name);
      fd.append('user[surname]',$rootScope.User.last_name);
      fd.append('user[username]','@' + $scope.facebookUser);
      //
      fd.append('user[facebook_token]',$rootScope.User.accessToken);
      if (isFormValid) {
        $ionicLoading.show();
        //var User = $scope.user;
          console.log("THIS",fd);
        AuthService.registerFB(fd).then(function (data) {
            //OneSignal.setDeviceTags();
            $ionicLoading.hide();
            $localStorage.CurrentUser = data;
            $localStorage.FBtoken = $rootScope.User.accessToken
            $state.go("tab.map");
            console.log(data);
            //ModalService.hide("auth-modal");
            //$state.go("app.home");
          },
          function (error) {
            $ionicLoading.hide();

            console.log("*** error registering new user: " + angular.toJson(error));
            //if (!error) {
            //  $scope.showAlert(CONSTANTS.MSG_FACEBOOK_CONNECT_ERROR);
            //} else if (error === "duplicate") {
            //  $scope.showAlert(CONSTANTS.MSG_FACEBOOK_ALREADYREGISTERED);
            //  $scope.error = error;
            //}
          });
      }}

  })


