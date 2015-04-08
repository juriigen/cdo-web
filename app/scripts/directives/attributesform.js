'use strict';

/**
 * @ngdoc directive
 * @name cdoWebApp.directive:attributesForm
 * @description
 * # attributesForm
 */
angular.module('cdoWebApp')
  .directive('attributesForm', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/attributesform.html'
    };
  });

angular.module('cdoWebApp').directive('markdownEditor', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      element.markdown({
        savable: false,
        autofocus:false,
        hideable: false,
        onChange: function (e) {
          ngModel.$setViewValue(e.getContent());
        },
        onShow: function (e) {
          scope.$watch(function () {
            return ngModel.$modelValue;
          }, function (modelValue) {
            if (modelValue) {
              e.setContent(modelValue);
              //e.showPreview();
            }
          });
        }
      });
    }
  };
});
