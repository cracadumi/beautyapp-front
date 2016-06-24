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
        User.role = "user";
        //for(var prop in User){
        //
        //}
        //AuthService.register(User).then(function (data) {
        //  //OneSignal.setDeviceTags();
        //  $ionicLoading.hide();
        //
        //  console.log(data);
        //  $state.go("tab.map");
        //
        //}).catch(function (error) {
        //  console.log("*** error registering new user: " + angular.toJson(error));
        //  $ionicLoading.hide();
        //  $scope.error = error;
        //});
        //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
        /*var request = $http({
         method: "post",
         url: "http://beautyapp.herokuapp.com/api/v1/registrations.json",
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         transformRequest: function(obj) {
         var str = [];
         for(var p in obj)
         str.push("user[" +encodeURIComponent(p) + "]=" + encodeURIComponent(obj[p]));
         return str.join("&");
         },
         data:User
         //{
         //  "user[role]":"user",
         //  "user[password]":"123qwe",
         //  "user[email]":"qweads@we.ee",
         //  "user[name]":"testuser",
         //  "user[surname]":"testuser",
         //  "user[username]":"testuser"
         //}


         });*/

        /*request.success(
         function(data){
         console.log(data);
         }
         );*/

        var fd = new FormData();
        //fd.append('file', file);
        fd.append("user[role]", "user");
        fd.append("user[password]", "123qwe");
        fd.append("user[email]", "qweads%40we.ee");
        fd.append("user[name]", "testuser");
        fd.append("user[surname]", "testuser");
        fd.append("user[username]", "testuser");
        //  "user[name]":"testuser",
        //  "user[surname]":"testuser",
        //  "user[username]":"testuser"
        $http.post("http://beautyapp.herokuapp.com/api/v1/registrations.json", fd, {
            //transformRequest: angular.identity,
            //headers: {'Content-Type': "multipart/form-data"}
          })
          .success(function () {
          })
          .error(function () {
          });
      }

    }
  })

/*
 .service('fileUpload', ['$http', function ($http) {
 this.uploadFileToUrl = function(file, uploadUrl){
 var fd = new FormData();
 fd.append('file', file);
 $http.post(uploadUrl, fd, {
 transformRequest: angular.identity,
 headers: {'Content-Type': undefined}
 })
 .success(function(){
 })
 .error(function(){
 });
 }
 }]);*/
