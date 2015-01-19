'use strict';

/**
 * @ngdoc directive
 * @name cdoWebApp.directive:removeNode
 * @description
 * # removeNode
 */
angular.module('cdoWebApp')
  .directive('removeNode', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/removenode.html'
    };
  });
