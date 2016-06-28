angular.module('starter')
  .controller('AccountCtrl', function($scope,$state,$rootScope,$localStorage) {
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
    $scope.$on('$ionicView.beforeEnter', function(e) {
      $scope.user = $localStorage.CurrentUser;
      $scope.user.created_at = $scope.user.created_at.substr(0,4) ;
    });

    //console.log($rootScope.CurrentUser,$scope.user);


  });
