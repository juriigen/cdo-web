'use strict';

/**
 * @ngdoc directive
 * @name cdoWebApp.directive:objectIdentity
 * @description
 * # objectIdentity
 */
angular.module('cdoWebApp')
  .directive('objectIdentity', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/objectidentity.html'
    };
  });
