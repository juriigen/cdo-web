'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:GovattributesCtrl
 * @description
 * # GovattributesCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('GovattributesCtrl', function ($scope, $log, RepoAccessService) {

    $scope.itemsByPage=1500;

    $scope.rowCollection = [];

    RepoAccessService.get('/obj/repo/governance.GovernanceAttribute?rrefs', function (data, status) {

      if (status === 200) {
        var result = data.data
        $log.info(JSON.stringify(result))
        for (var j = 0; j < result.length; j++) {
          $log.info(JSON.stringify(result[j]));
          $scope.rowCollection.push(result[j]);
        }

      } else {

      }
    });

  });
