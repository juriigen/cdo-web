'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:RepoCtrl
 * @description
 * # MainCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('RepoCtrl', function ($scope, $log) {
    var repo = this;

    $scope.$on('objectSelected', function (scope, data) {
      repo.selectedObject = data;
      $log.debug('RepoCtrl.objectSelected - received event - id ' + repo.selectedObject.id);
    });
  });
