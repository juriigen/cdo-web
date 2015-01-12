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
        $log.debug('RepoCtrl.$stateChangeStart - event received - ' + toState.name);
        $scope.tab = toState.name;
      });

    $scope.$on('objectSelected', function (scope, data) {
      $scope.selectedObject = data;
      $log.debug('RepoCtrl.objectSelected - received event - id ' + $scope.selectedObject.id);
    });
  });
