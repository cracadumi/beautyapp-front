angular.module('starter')
  .controller('AccountCtrl', function($scope,$state) {
   $scope.openSettings = function(){
     $state.go('tab.profile-settings');
   }
    $scope.openSettingsChangePass = function(){
      $state.go('tab.profile-settings-change-password');
    }
    $scope.openSettingsPayments = function(){
      $state.go('tab.profile-settings-payments');
    }
      $scope.goToAddCard = function(){
        $state.go('tab.profile-settings-addcard')
      }
  });
