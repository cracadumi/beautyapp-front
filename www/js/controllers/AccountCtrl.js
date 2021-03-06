angular.module('starter')
  .controller('AccountCtrl', function ($scope,
                                       $state,
                                       $rootScope,
                                       $localStorage,
                                       AuthService,
                                       ProfileService,
                                       $ionicLoading,
                                       $ionicHistory,
                                       $timeout,
                                       $ionicPopup,
                                       $translate,
                                       $ionicActionSheet,
                                       $cordovaCamera) {
    if($localStorage.tokens){
      var access_token = $localStorage.tokens.access_token;
    }


    $scope.data = {
      language: $localStorage.selectedLanguage
    };

    $scope.$on('$ionicView.beforeEnter', function (e) {
      $rootScope.hideTabs = false;
      //if (!$localStorage.CurrentUser) {
      //  $state.go('tab.signin');
      //}
      //else{
      if($localStorage.CurrentUser){
        $scope.user = $localStorage.CurrentUser;
        console.log($localStorage.CurrentUser);
      }

      $scope.user.created_at = $scope.user.created_at.substr(0, 4);
      //}

    });

    $scope.toggleField = function ($event) {
      $scope.openField = !$scope.openField;
      //if(!!$scope.openField){
      //  angular.element(document.querySelector('#textarea')).triggerHandler('clickfocus');
      //}
      console.log($scope.openField);
    };

    //$scope.onTap = function(event){
    //  $(this).addClass('active');
    //}

    $scope.$on('$ionicView.Enter', function (e) {
      $scope.payments = [{name: $localStorage.payments}];
      console.log($scope.payments);
    });

    $scope.openSettings = function () {
      $state.go('tab.profile-settings');
    };

    $scope.openSettingsChangePass = function () {
      $state.go('tab.profile-settings-change-password');
    };

    $scope.openSettingsPayments = function () {
      $state.go('tab.profile-settings-payments');
    };

    $scope.goToAddCard = function () {
      $state.go('tab.profile-settings-addcard')
    };


    $scope.signOut = function (access_token) {
      $ionicLoading.show();
      AuthService.signOut(access_token).then(function (data) {
        delete $localStorage.tokens;
        delete $localStorage.CurrentUser;
        $state.go('tab.signin');
        $ionicLoading.hide();
      })
    };

    $scope.togglePaymentsMethod = function (method) {
      console.log(method);
      $localStorage.payments = method;
      console.log($localStorage.payments);
    };

    $scope.ChPassword = {};
    $scope.submitForm = function (isFormValid) {
      //console.log("!!!");
      if (isFormValid) {
        $ionicLoading.show();
        //var User = $scope.current_password;

        var password = $scope.ChPassword.password;
        var current_password = $scope.ChPassword.current_password;
        console.log(current_password, password);
        AuthService.changePass(password, current_password).then(function (data) {
          console.log(data);
          $ionicLoading.hide();
          $ionicHistory.goBack();
        }, function (e) {
          //TODO handle change pass error
          $ionicLoading.hide();
          console.log(e);
        });
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
    };

    //trigger a save button
    $scope.clickOnSubmitUpdate = function () {
      $timeout(function () {
        angular.element(document.querySelector('#save-button')).triggerHandler('click');
      }, 100);
    };
    $scope.event = function(){
      console.log("move");
    };

    $scope.userData = {};
    $scope.userData.bio = $localStorage.CurrentUser.bio;
    if($localStorage.CurrentUser.profile_picture) {
      $scope.userData.profile_picture = $localStorage.CurrentUser.profile_picture;
    }
    else{
      $scope.userData.profile_picture = {};
    }

    //console.log($localStorage.CurrentUser.bio);
    $scope.submitFormUpdate = function () {
      console.log($scope.userData);
      //for(var i =0;)
      var field = $scope.userData;
      console.log(field);
      var message;
      $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
          title: message,
        })
      };

      if (field) {
        //var fd = new FormData;

        //fd.append('user[bio]', $scope.userData.textarea);
        $ionicLoading.show();
        ProfileService.updateProfile($scope.userData).then(function (data) {
          console.log($scope.userData);
          console.log("SUCCESS", data);
          AuthService.showUser($localStorage.tokens.access_token).then(function (user) {
            //console.log(user);
            $localStorage.CurrentUser = user;
          });
          $ionicLoading.hide();
          message = "Data succeful update";
          $scope.showAlert();
        }, function (e) {
          //TODO handle change pass error
          $ionicLoading.hide();
          console.log(e);
        });

      }
    };

    $scope.setLanguage = function (langKey) {
      console.log(langKey);
      $localStorage.selectedLanguage = langKey;
      $translate.use(langKey);
    };

    //Move to Static pages
    $scope.goToSettingsHelp = function(){
      $state.go('tab.profile-settings-help');
      console.log("!!!");
    };

    $scope.goToSettingsAbout = function(){
      $state.go('tab.profile-settings-about');
    };

    $scope.goToSettingsPolicy = function(){
      $state.go('tab.profile-settings-policy');
    };

    $scope.goToSettingsTerms = function(){
      $state.go('tab.profile-settings-terms');
    };

    $scope.changePicture = function(){
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        allowEdit: true,
        encodingType: Camera.EncodingType.PNG,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        targetWidth: 140,
        targetHeight: 140
      };

      $ionicActionSheet.show({
        titleText: "Select image sour",
        buttons: [
          { text: "<i class=\"icon ion-camera\"></i> Camera" },
          { text: "<i class=\"icon ion-image\"></i> Gallery" }
        ],
        cancelText: "Cancel",
        cancel: angular.noop,
        buttonClicked: function (index) {
          switch (index) {
            case 0:
              options.sourceType = Camera.PictureSourceType.CAMERA;
              $cordovaCamera.getPicture(options).then(function (imageURI) {
                // convert base64 to file
                //var file = ImageUtil.dataURItoBlob("data:image/png;base64," + imageURI);
                //$scope.stagePhoto(file);
                $scope.userData.profile_picture.s70 = "data:image/png;base64," + imageURI;
              }, function (err) {
                console.log(err);
              });
              break;
            case 1:
              options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
              $cordovaCamera.getPicture(options).then(function (imageURI) {
                //var file = ImageUtil.dataURItoBlob("data:image/png;base64," + imageURI);
                //$scope.stagePhoto(file);
                $scope.userData.profile_picture.s70 = "data:image/png;base64," + imageURI;
              }, function (err) {
                console.log(err);
              });
              break;
          }
          return true;
        }
      });
    };
  });
