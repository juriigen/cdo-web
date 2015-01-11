'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:RepoCtrl
 * @description
 * # MainCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('RepoCtrl', function ($scope, $log, RepoAccessService) {
    var repo = this;
    $scope.$on('objectSelected', function (scope, data) {
      repo.selectedObject = data;

      $log.debug('RepoCtrl.objectSelected - received event - id ' + repo.selectedObject.id);

      RepoAccessService.get(repo.selectedObject._links.self.href + '?crefs&rrefs&meta', function (data, status) {
        if (status === 200) {
          repo.selectedObject = data.data
        }
      });
    });
  });
