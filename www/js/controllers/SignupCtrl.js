angular.module('starter')
  .controller('SignupCtrl', function ($rootScope, $scope, $state, $ionicLoading, transformRequestAsFormPost, $http,$ionicPopup,$ionicHistory) {
    $scope.$on('$ionicView.beforeEnter', function (e) {
      console.log('hiding tabbar');
      $rootScope.hideTabs = true;
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
              title:  'You successful registered ',
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
                template: "Use another email",
              })}
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
  })


