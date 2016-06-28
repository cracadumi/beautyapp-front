angular.module('starter')
  .controller('SigninCtrl', function($rootScope, $scope, $state,$ionicLoading,$http,$ionicPopup,AuthService,$localStorage) {
    // Hide tabbar before app enters the view
    $scope.$on('$ionicView.beforeEnter', function(e) {
      console.log('hiding tabbar');
      $rootScope.hideTabs = true;
    });
    //show tab bar when user signings successfully
    //$scope.$on('$ionicView.leave', function(e) {
    //  console.log('showing tabbar');
    //  $rootScope.hideTabs = false;
    //});
    $scope.goToSignUp = function(){
      $state.go('tab.signup');
    }
$scope.goToEmail = function(){
  $state.go('tab.signin-email');
  console.log("done");
}


    $scope.submitForm = function (isFormValid) {
      if (isFormValid) {
        $ionicLoading.show();
        var User = $scope.user;
        User.email.toLowerCase();


        var fd = new FormData();
        fd.append('grant_type','password');
        fd.append('username',User.email);
        fd.append('password',User.password);
        $http.post('http://beautyapp.herokuapp.com/oauth/token', fd, {
            //transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          })
          .success(function(data){
          console.log(data)
            var access_token = data.access_token;
            AuthService.showUser(access_token).then(function(user){
              console.log(user);
              $localStorage.CurrentUser = user;
              console.log(user,$localStorage.CurrentUser);
            })
            $ionicLoading.hide();

            $state.go('tab.map')
          })
          .error(function(e){
            $ionicLoading.hide();


          });
      }

    }
  });
