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
  });

