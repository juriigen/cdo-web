'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:ReferencesCtrl
 * @description
 * # ReferencesCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('ReferencesCtrl', function ($scope, $log, CalculateUrlService, RepoAccessService, ContextService) {

    $scope.getIcon = function (url) {
      return CalculateUrlService.getUrl(url);
    };

    $scope.removeReference = function (id, reference) {
      var url = $scope.selectedObject._links.self.href + '/references/' + reference + '/' + id;
      $log.debug('ReferencesCtrl.removeReference - ' + url);

      $scope.dataLoading = true;
      RepoAccessService.delete(url + '?rrefs&meta', function (data, status) {
        if (status === 200) {

          ContextService.updateSelectedObject(data.data);
          $scope.dataLoading = false;
          $scope.status = data.status;
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
      $log.debug('ReferencesCtrl.closeAlert - index ' + index);
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
            if (diag.feature.indexOf('references') === 0) {
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
      $log.debug('ReferencesCtrl.objectSelected - reset status ' + $scope.selectedObject.id);
    });

    $scope.$on('updateSelectedObject', function (scope, data) {
      if (data === undefined) {
        $scope.status = undefined;
        $log.debug('ReferencesCtrl.updateSelectedObject - reset status - undefined');
      }
    });



  });
