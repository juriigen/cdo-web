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
