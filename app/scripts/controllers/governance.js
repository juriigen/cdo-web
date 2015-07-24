'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:GovernanceCtrl
 * @description
 * # GovernanceCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('GovernanceCtrl', function ($rootScope, $scope, $state, $log) {

    $scope.tab = 'governance';

    $rootScope.$on('$stateChangeStart',
      function(event, toState){
        $log.debug('GovernanceCtrl.$stateChangeStart - received even - ' + toState.name);
        $scope.tab = toState.name;
      });

    $scope.$on('objectSelected', function (scope, data, status) {

      $scope.selectedObject = data;
      $log.debug('GovareasCtrl.objectSelected - received event - id ' + $scope.selectedObject.id);

      $scope.status = status;
      $log.debug('>> set status to scope - ' + status.status);
    });

    $scope.$on('updateSelectedObject', function (scope, data) {
      $scope.selectedObject = data;
      $log.debug('GovareasCtrl.updateSelectedObject - received event');
    });

  });

