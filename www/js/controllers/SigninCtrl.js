angular.module('starter')
  .controller('SigninCtrl', function($rootScope, $scope, $state) {
    // Hide tabbar before app enters the view
    $scope.$on('$ionicView.beforeEnter', function(e) {
      console.log('hiding tabbar');
      $rootScope.hideTabs = true;
    });
    //show tab bar when user signings successfully
    /*$scope.$on('$ionicView.leave', function(e) {
      console.log('showing tabbar');
      $rootScope.hideTabs = false;
    });*/
    $scope.goToSignUp = function(){
      $state.go('tab.signup');
      console.log("goo!");
    }
  });
