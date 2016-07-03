angular.module("starter")
  .service("FiltersService", [
    "$q",
    function ($q) {

      var FILTER_CONST = {
        categories: [
          'Coaching',
          'Hair',
          'Makeup',
          'Nails'
        ],
        priceRanges: [
          '$', '$$', '$$$'
        ],
        rating: {
          max: 5
        },
        distance: {
          min: 2,
          max: 20
        }
      };

      var _filters = {
        category: 'Nails',
        price: 1,
        rating: 4,
        distance: 18
      };

      var setFilters = function (filters) {
        console.log(filters);
        _filters = filters;
      };

      var getFilters = function () {
        return _filters;
      };

      return{
        getFilterConstants: function () {
          return FILTER_CONST;
        },
        setFilters: setFilters,
        getFilters: getFilters
      }

    }]);
