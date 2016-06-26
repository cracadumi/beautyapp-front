angular.module('starter')
  .controller('SignupCtrl', function ($rootScope, $scope, $state, $ionicLoading, transformRequestAsFormPost, $http) {
    $scope.$on('$ionicView.beforeEnter', function (e) {
      console.log('hiding tabbar');
      $rootScope.hideTabs = true;
    });
    $scope.signUpEmail = function () {
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


        var fd = new FormData();
        fd.append('user[role]',"user");
        fd.append('user[password]',User.password);
        fd.append('user[email]',User.email);
        fd.append('user[name]',User.name);
        fd.append('user[surname]',User.surname);
        fd.append('user[username]',User.username);
        $http.post('http://beautyapp.herokuapp.com/api/v1/registrations.json', fd, {
            //transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          })
          .success(function(data){
            console.log(data);
            $ionicLoading.hide();
          })
          .error(function(e){
            console.log(e);
            $ionicLoading.hide();
          });
      }

    }
  })


