'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:RepoCtrl
 * @description
 * # RepoCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('RepoCtrl', function ($scope, $log) {

    $scope.$on('objectSelected', function (scope, data) {
      $scope.selectedObject = data;
      $log.debug('RepoCtrl.objectSelected - received event - id ' + $scope.selectedObject.id);
    });
  });
