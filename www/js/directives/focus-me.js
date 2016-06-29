angular.module('starter')
  .directive('focusMe', ['$timeout', function($timeout) {

    return {
      restrict: 'AC',
      link: function(_scope, _element) {
        $timeout(function(){
          _element[0].focus();
        }, 500);

        _scope.onBlur = function($event){
          $event.preventDefault();
          _element[0].focus();
        };
      }
    };
  }]);
