'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:AttributesctrlCtrl
 * @description
 * # AttributesctrlCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('AttributesctrlCtrl', function ($scope, $log, RepoAccessService, ContextService, toaster) {

    $scope.save = function() {

      var attributes = {};
      // set empty strings to null
      $scope.selectedObject.meta.attributes.forEach(function(attributeMeta) {
        var attribute = $scope.selectedObject.attributes[attributeMeta.feature];
        if (attribute === undefined || attribute.length === 0) {
          attributes[attributeMeta.feature] = null;
        } else {
          attributes[attributeMeta.feature] = attribute;
        }
      });

      $scope.dataLoading = true;
      RepoAccessService.put($scope.selectedObject._links.self.href + '?rrefs&meta', { 'attributes': attributes }, function (data, status) {
        if (status === 200) {

          ContextService.updateSelectedObject(data.data);
          if (data.status.revisionDeltas !== undefined) {
            toaster.pop('success', 'Save', data.status.revisionDeltas[0].revisionDelta);
          }
          $scope.dataLoading = false;

        } else {
          // reload from repo in case of failed!
          ContextService.setSelectedObject(data.data);
          $scope.dataLoading = false;
        }
      });
    };

  });
