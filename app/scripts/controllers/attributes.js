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

    $scope.save = function() {

      var attributes = {};
      // set empty strings to null
      $scope.selectedObject.meta.attributes.forEach(function(attributeMeta) {
        var attribute = $scope.selectedObject.attributes[attributeMeta.feature];
        $log.debug('AttributesCtrl check attribute - ' + attribute)
        if (attribute === undefined || attribute === null || attribute.length === 0) {
          attributes[attributeMeta.feature] = null;
        } else {
          attributes[attributeMeta.feature] = attribute;
        }
      });

      $scope.dataLoading = true;
      RepoAccessService.put($scope.selectedObject._links.self.href + '?rrefs&meta', { 'attributes': attributes }, function (data, status) {
        if (status === 200) {

          ContextService.updateSelectedObject(data.data);
          $scope.dataLoading = false;

        } else {
          // reload from repo in case of failed!
          ContextService.setSelectedObject(data.data);
          $scope.dataLoading = false;
        }
        $scope.status = data.status;
      });
    };

    $scope.closeAlert = function() {
      $scope.status = undefined;
    };

    $scope.$on('objectSelected', function () {
      $scope.status = undefined;
      $log.debug('AttributesctrlCtrl.objectSelected - reset status ' + $scope.selectedObject.id);
    });

  });
