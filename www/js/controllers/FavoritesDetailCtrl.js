angular.module('starter')
  .controller('FavoritesDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.favId);
  });
