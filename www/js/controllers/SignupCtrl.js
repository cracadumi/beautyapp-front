angular.module('starter')
  .controller('SignupCtrl', function($rootScope, $scope) {
    // Hide tabbar before app enters the view
    $scope.$on('$ionicView.beforeEnter', function(e) {
      $rootScope.hideTabs = true;
    });
    //show tabbar when user leaves the view
    $scope.$on('$ionicView.afterLeave', function(e) {
      $rootScope.hideTabs = false;
    });
  })
