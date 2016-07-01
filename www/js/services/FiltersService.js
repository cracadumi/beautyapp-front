angular.module("starter")
  .service("FiltersService", [
    "$q",
    function ($q) {

      var FILTER_CONST = {
        categories: [
          'Hair',
          'Makeup',
          'Nails',
          'Coaching'
        ],
        priceRanges: [
          {
            label: '$1 - $99',
            value: 99
          },
          {
            label: '$101 - $199',
            value: 199
          },
          {
            label: '$200 +',
            value: 200
          }
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
        price: 99,
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
