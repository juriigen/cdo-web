'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:AttributesCtrl
 * @description
 * # AttributesCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('AttributesCtrl', function ($scope, $log, RepoAccessService, ContextService) {
    $scope.save = function () {

      var attributes = {};
      // set empty strings to null
      $scope.selectedObject.meta.attributes.forEach(function (attributeMeta) {
        var attribute = $scope.selectedObject.attributes[attributeMeta.feature];
        $log.debug('AttributesCtrl check attribute - ' + attribute);
        if (attribute === undefined || attribute === null || attribute.length === 0) {
          attributes[attributeMeta.feature] = null;
        } else {
          attributes[attributeMeta.feature] = attribute;
        }
      });

      $scope.dataLoading = true;
      RepoAccessService.put($scope.selectedObject._links.self.href + '?rrefs&meta', {'attributes': attributes}, function (data, status) {
        if (status === 200) {

          ContextService.updateSelectedObject(data.data);
          $scope.dataLoading = false;
          $scope.status = data.status;
        } else if (status === 409) {
          $scope.status = {};
          $scope.status.error = status + ' - ' + data.error.message + ' : ' + attributes.name;
          $scope.dataLoading = false;
        } else if (status === 404) {
          $scope.status = {};
          $scope.status.error = status + ' - ' + data.error.message;
          $scope.selectedObject = undefined;
          $scope.dataLoading = false;
        } else {
          $scope.status = {};
          $scope.status.error = 'Technical problem udpdating ' + $scope.selectedObject._links.self.href;
          $scope.dataLoading = false;
        }
      });
    };

    $scope.closeAlert = function (index, list) {
      $log.debug('AttributesCtrl.closeAlert - index ' + index);
      if (index !== undefined) {
        list.splice(index, 1);
      } else {
        $scope.status = undefined;
      }
    };

    $scope.showAlertSuccess = function () {
      if ($scope.status !== undefined && $scope.status.revisionDeltas !== undefined && $scope.status.revisionDeltas.length > 0) {
        return true;
      }
      return false;
    };

    $scope.showAlertDiagnostics = function () {
      var result = false;
      if ($scope.status !== undefined && $scope.status.diagnostics !== undefined) {
        $scope.status.diagnostics.forEach(function (entry) {
          entry.diagnostic.forEach(function (diag) {
            if (diag.feature.indexOf('attributes') === 0) {
              result = true;
            }
          });
        });
      }
      return result;
    };

    $scope.$on('objectSelected', function (scope, data, status) {
      if (status.status === 'INVALID') {
        $scope.status = status;
      } else {
        $scope.status = undefined;
      }
      //$log.debug('AttributesCtrl.objectSelected - reset status ' + $scope.selectedObject.id);
    });

    $scope.$on('updateSelectedObject', function (scope, data) {
      if (data === undefined) {
        $scope.status = undefined;
        $log.debug('AttributesCtrl.updateSelectedObject - reset status - undefined');
      }
    });

  });
