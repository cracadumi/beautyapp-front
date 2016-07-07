angular.module('starter')
  .controller('SigninCtrl', function ($rootScope, $scope, $state, $ionicLoading, $http, $ionicPopup, AuthService, $localStorage) {
    // Hide tabbar before app enters the view
    $scope.$on('$ionicView.beforeEnter', function (e) {
      $rootScope.hideTabs = true;
      //if ($localStorage.CurrentUser) {
      //  $state.go('tab.profile');
      //}

      if($localStorage.CurrentUser){
        $scope.user = $localStorage.CurrentUser;
        $scope.user.created_at = $scope.user.created_at.substr(0,4) ;
        $state.go('tab.map');
      }
    });

    //show tab bar when user signings successfully
    //$scope.$on('$ionicView.leave', function(e) {
    //  console.log('showing tabbar');
    //  $rootScope.hideTabs = false;
    //});
    $scope.goToSignUp = function () {
      $state.go('tab.signup');
    };

    $scope.goToEmail = function () {
      $state.go('tab.signin-email');
    };

    $scope.SignInFB = function(){
      var request = new FormData();
      $ionicLoading.show();
      request.append('grant_type', 'assertion');
      request.append('assertion', $localStorage.FBtoken);

      AuthService.SignInFB(request).then(function (data) {
          //OneSignal.setDeviceTags();
          $ionicLoading.hide();
          var accessToken = data.data.access_token;
          AuthService.showUser(accessToken).then(function (user) {
            console.log(user);
            $localStorage.CurrentUser = user;
            $state.go('tab.map')
            //console.log(user, $localStorage.CurrentUser);

          })
            .catch(function (error) {
              console.log("*** error3 : " + angular.toJson(error.status));
              $ionicLoading.hide();
              //


            });
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
    };

    $scope.submitForm = function (isFormValid) {
      if (isFormValid) {
        $ionicLoading.show();
          AuthService.login($scope.user).then(function (data) {
            $ionicLoading.hide();
            $state.go('tab.map');
          }, function (e) {
            $ionicLoading.hide();
            console.log(e.error = "invalid_grant");
            $scope.showAlert = function() {
              var alertPopup = $ionicPopup.alert({
                title: error,
                template: "Try again"
              })};
            if(e.error = "invalid_grant"){
              error = "Email or password are wrong!";
              $scope.showAlert();
            }
          });
      }

    }
  });
