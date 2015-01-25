'use strict';

/**
 * @ngdoc directive
 * @name cdoWebApp.directive:referencesForm
 * @description
 * # referencesForm
 */
angular.module('cdoWebApp')
  .directive('referencesForm', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/referencesform.html'
    };
  });
