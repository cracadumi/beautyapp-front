angular.module('starter')
  .controller('FiltersCtrl', function(FiltersService, $scope, $ionicHistory) {

    $scope.filters = FiltersService.getFilters();
    $scope.filterValues = FiltersService.getFilterConstants();
    console.log($scope.filterValues);

    $scope.data = {};
    $scope.data.price = $scope.filterValues.priceRanges[1]; // Default

    $scope.applyFilters = function () {
      FiltersService.setFilters($scope.filters);
      $ionicHistory.goBack();
    };

    $scope.updatePriceFilter = function (price) {
      $scope.filters.price = price;//angular.copy($scope.data.price.value);
    };


  });
