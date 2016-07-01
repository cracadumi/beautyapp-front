// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'uiGmapgoogle-maps', 'ion-floating-menu', 'ionic.rating', 'google.places', 'starter.services','ngStorage'])

.run( function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization,places'
  });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
    .state('tab.signup', {
      url: '/signup',
      views: {
        'tab-signup': {
          templateUrl: 'templates/tab-signup.html',
          controller: 'SignupCtrl'
        }
      }
    })
  //signUpEmail
    .state('tab.signup-email', {
      url: '/signup-email',
      views: {
        'tab-signup': {
          templateUrl: 'templates/tab-signup-email.html',
          controller: 'SignupCtrl'
        }
      }
    })

  .state('tab.signin', {
    url: '/signin',
    views: {
      'tab-signin': {
        templateUrl: 'templates/tab-signin.html',
        controller: 'SigninCtrl'
      }
    }
  })
    .state('tab.signin-email', {
      url: '/signin-email',
      views: {
        'tab-signin': {
          templateUrl: 'templates/tab-signin-email.html',
          controller: 'SigninCtrl'
        }
      }
    })
  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('tab.map-filters', {
    url: '/map/filters',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map-filters.html',
        controller: 'FiltersCtrl'
      }
    }
  })

  .state('tab.favorites', {
      url: '/favorites',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/tab-favorites.html',
          controller: 'FavoritesCtrl'
        }
      }
    })
    .state('tab.favorites-detail', {
      url: '/favorites/:favId',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/tab-favorites-detail.html',
          controller: 'FavoritesDetailCtrl'
        }
      }
    })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'AccountCtrl'
      }
    }
  })
    .state('tab.profile-settings', {
    url: '/profile-settings',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-profile-settings.html',
        controller: 'AccountCtrl'
      }
    }
  })
    .state('tab.profile-settings-change-password', {
      url: '/profile-settings-change-password',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-profile-settings-change-password.html',
          controller: 'AccountCtrl'
        }
      }
    })

    .state('tab.profile-settings-payments', {
      url: '/profile-settings-payments',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-profile-settings-payments.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('tab.profile-settings-addcard', {
      url: '/profile-settings-addcard',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-profile-settings-addcard.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('tab.profile-settings-help', {
      url: '/profile-settings-help',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-profile-settings-help.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('tab.profile-settings-about', {
      url: '/profile-settings-about',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-profile-settings-about.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('tab.profile-settings-policy', {
    url: '/profile-settings-policy',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-profile-settings-policy.html',
        controller: 'AccountCtrl'
      }
    }
  })
    .state('tab.profile-settings-terms', {
      url: '/profile-settings-terms',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-profile-settings-terms.html',
          controller: 'AccountCtrl'
        }
      }
    })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/signup');

});
