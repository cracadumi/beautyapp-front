angular.module('starter')
  .controller('AccountCtrl', function($scope,$state,$rootScope,$localStorage,AuthService,$ionicLoading) {
    $scope.$on('$ionicView.beforeEnter', function (e) {
      console.log('hiding tabbar');
      $rootScope.hideTabs = true;
      //if (!$localStorage.CurrentUser) {
      //  $state.go('tab.signin');
      //}
      //else{
      //  $scope.user = $localStorage.CurrentUser;
      //  $scope.user.created_at = $scope.user.created_at.substr(0,4) ;
      //}
$scope.updateGrossOptions = function(){

}
    });
    $scope.$on('$ionicView.Enter', function (e) {
      $scope.payments = [{name:$localStorage.payments}]
      console.log($scope.payments);
    })


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


$scope.togglePaymentsMethod = function(method){
  console.log(method);
  $localStorage.payments = method;
  console.log($localStorage.payments);
}
   $scope.ChPassword = { } ;
    $scope.submitForm = function (isFormValid) {
      //console.log("!!!");
      if (isFormValid) {
        $ionicLoading.show();
        //var User = $scope.current_password;

        var password = $scope.ChPassword.password;
        var current_password = $scope.ChPassword.current_password;
        console.log(current_password,password);
        AuthService.changePass(password, current_password).then(function (data) {
          consoloe.log(data)
        })
        //  .error(function(e){
        //  console.log(e.errors,e.errors.email);
        //  $ionicLoading.hide();
        //})
        //.error(function(e){
        //  console.log(e.errors,e.errors.email);
        //  var error;
        //  $ionicLoading.hide();
        //  $scope.showAlert = function() {
        //    var alertPopup = $ionicPopup.alert({
        //      title: error,
        //      template: "Use another email",
        //    })}
        //  if(!!e.errors.email && e.errors.email == "has already been taken"){
        //    error = "user already has an account with this email";
        //    $scope.showAlert();
        //  }
        //  if(!!e.errors.username && e.errors.username == "has already been taken"){
        //    error = "user already has an account with this username";
        //    $scope.showAlert();
        //  }
        //});
      }
    }
  });
