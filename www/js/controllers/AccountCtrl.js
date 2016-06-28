angular.module('starter')
  .controller('AccountCtrl', function($scope,$state,$rootScope,$localStorage,AuthService) {
    $scope.$on('$ionicView.beforeEnter', function (e) {
      console.log('hiding tabbar');
      $rootScope.hideTabs = true;
      if (!$localStorage.CurrentUser) {
        $state.go('tab.signin');
      }
      else{
        $scope.user = $localStorage.CurrentUser;
        $scope.user.created_at = $scope.user.created_at.substr(0,4) ;
      }
    });
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
    var access_token = $localStorage.tokens.access_token;
$scope.signOut = function(access_token){
  AuthService.signOut(access_token).then(function (data) {
    delete $localStorage.tokens.access_token;
    delete $localStorage.CurrentUser;
console.log(data);
    $state.go('tab.signin');
  })
}
    //console.log($rootScope.CurrentUser,$scope.user);


  });
