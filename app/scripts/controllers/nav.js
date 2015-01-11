'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:NavCtrl
 * @description
 * # NavctrlCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      var active = (viewLocation === $location.path());
      return active;
    };
  });
