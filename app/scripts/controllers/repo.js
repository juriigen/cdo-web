'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:RepoCtrl
 * @description
 * # RepoCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('RepoCtrl', function ($rootScope, $scope, $state, $log) {

    $scope.tab = 'repo';

    $rootScope.$on('$stateChangeStart',
      function(event, toState){
        $log.debug('RepoCtrl.$stateChangeStart - received even - ' + toState.name);
        $scope.tab = toState.name;
      });

    $scope.$on('objectSelected', function (scope, data, status) {

      $scope.selectedObject = data;
      $log.debug('RepoCtrl.objectSelected - received event - id ' + $scope.selectedObject.id);

      $scope.status = status;
      $log.debug('>> set status to scope - ' + status.status);
    });

    $scope.$on('updateSelectedObject', function (scope, data) {
      $scope.selectedObject = data;
      $log.debug('RepoCtrl.updateSelectedObject - received event - id ' + $scope.selectedObject.id);
    });
  });
