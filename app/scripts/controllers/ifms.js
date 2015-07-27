'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:IfmsCtrl
 * @description
 * # IfmsCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('IfmsCtrl', function ($rootScope, $scope, $state, $log) {

    $scope.tab = 'ifms';

    $rootScope.$on('$stateChangeStart',
      function(event, toState){
        $log.debug('IfmsCtrl.$stateChangeStart - received even - ' + toState.name);
        $scope.tab = toState.name;
      });

    $scope.$on('objectSelected', function (scope, data, status) {

      $scope.selectedObject = data;
      $log.debug('IfmsCtrl.objectSelected - received event - id ' + $scope.selectedObject.id);

      $scope.status = status;
      $log.debug('>> set status to scope - ' + status.status);
    });

    $scope.$on('updateSelectedObject', function (scope, data) {
      $scope.selectedObject = data;
      $log.debug('IfmsCtrl.updateSelectedObject - received event');
    });

  });
