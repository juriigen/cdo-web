'use strict';

/**
 * @ngdoc directive
 * @name cdoWebApp.directive:refLink
 * @description
 * # refLink
 */
angular.module('cdoWebApp')
  .directive('refLink', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/reflink.html',
      scope:{
        refObject:'=',
        refFeature: '='
      }
    };
  });
