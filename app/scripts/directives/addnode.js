'use strict';

/**
 * @ngdoc directive
 * @name cdoWebApp.directive:addNode
 * @description
 * # addNode
 */
angular.module('cdoWebApp')
  .directive('addNode', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/addnode.html'
    };
  });
