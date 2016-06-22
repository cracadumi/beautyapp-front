angular.module('starter')
  .controller('SigninCtrl', function($rootScope, $scope,$state) {
    // Hide tabbar before app enters the view
    $scope.$on('$ionicView.beforeEnter', function(e) {
      $rootScope.hideTabs = true;
    });
    //show tabbar when user leaves the view
    $scope.$on('$ionicView.afterLeave', function(e) {
      $rootScope.hideTabs = false;
    });
    $scope.goToSignUp = function(){
      $state.go('tab.signup');
      console.log("goo!");
    }
  })
