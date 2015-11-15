'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('SearchCtrl', function ($rootScope, $scope, $state, $log, RepoAccessService, CalculateUrlService, ContextService) {
    $scope.searchLiterals = ['by id', 'by name', 'by description'];
    $scope.searchType = $scope.searchLiterals[1];
    $scope.rowCollection = [];

    $scope.search = function() {
      $log.debug('Search ' + $scope.searchType + ' ' + $scope.query);
      $scope.rowCollection = [];
      var param = '';
      if ($scope.searchType === $scope.searchLiterals[0]) {
        param = 'ID=' + $scope.query;
      }
      if ($scope.searchType === $scope.searchLiterals[1]) {
        param = 'name=' + $scope.query;
      }
      if ($scope.searchType === $scope.searchLiterals[2]) {
        param = 'description=' + $scope.query;
      }
      RepoAccessService.get('/obj/' + $rootScope.repository + 'base.FLElement?' + param, function (data, status) {

        if (status === 200) {
          var result = data.data;

          for (var j = 0; j < result.length; j++) {
            var label = result[j].label;
            if (label.length > 50) {
              result[j].label = label.substring(0, 50) + ' ...';
            }
            result[j].icon = CalculateUrlService.getUrl(result[j].icon);
            $scope.rowCollection.push(result[j]);
          }

        } else {

        }

      });
    };

    $scope.setNewObject = function(url) {
      ContextService.setSelectedObject(url);
    };


    $scope.$on('objectSelected', function (scope, data, status) {

      $scope.selectedObject = data;
      $log.debug('SearchCtrl.objectSelected - received event - id ' + $scope.selectedObject.id);

      $scope.status = status;
      $log.debug('>> set status to scope - ' + status.status);
    });

    $scope.$on('updateSelectedObject', function (scope, data) {
      $scope.selectedObject = data;
      $log.debug('SearchCtrl.updateSelectedObject - received event');
    });
  });
