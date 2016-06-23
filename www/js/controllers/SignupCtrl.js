angular.module('starter')
  .controller('SignupCtrl', function($rootScope, $scope,$state,$ionicLoading) {
    $scope.$on('$ionicView.beforeEnter', function(e) {
      console.log('hiding tabbar');
      $rootScope.hideTabs = true;
    });
   $scope.signUpEmail= function(){
$state.go('tab.signup-email');
   }
///Signup with Email
    $scope.user = {};
    $scope.confirmpass = "";
    $scope.isHandleAvailable = false;

    $scope.submitForm = function (isFormValid) {
      if (isFormValid) {
        $ionicLoading.show();
        var User = $scope.user;
        User.email.toLowerCase();

      }
    }
  });
