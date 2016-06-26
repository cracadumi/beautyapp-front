angular.module('starter')
  .controller('AccountCtrl', function($scope,$state) {
   $scope.openSettings = function(){
     $state.go('tab.profile-settings');
   }
  });
