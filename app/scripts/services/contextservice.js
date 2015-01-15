'use strict';

/**
 * @ngdoc service
 * @name cdoWebApp.ContextService
 * @description
 * # ContextService
 * Service in the cdoWebApp.
 */
angular.module('cdoWebApp')
  .service('ContextService', function ($rootScope, $log, RepoAccessService) {
    var selectedObject;

    var setSelectedObject = function (newObj) {
      selectedObject = newObj;
      $log.debug('ContextService.setSelectedObject - id ' + selectedObject.id);

      //$rootScope.$broadcast('objectSelected', selectedObject);

      RepoAccessService.get(selectedObject._links.self.href + '?rrefs&meta', function (data, status) {
        if (status === 200) {
          selectedObject = data.data;
          $log.debug('ContextService.objectedSelected - broadcast event');
          $rootScope.$broadcast('objectSelected', selectedObject);
        }
      });
    };

    var updateSelectedObject = function (newObj) {
      selectedObject = newObj;
      $log.debug('ContextService.updateSelectedObject - id ' + selectedObject.id);

      $log.debug('ContextService.updateSelectedObject - broadcast event');
      $rootScope.$broadcast('updateSelectedObject', selectedObject);

      /*
      RepoAccessService.get(selectedObject._links.self.href + '?rrefs&meta', function (data, status) {
        if (status === 200) {
          selectedObject = data.data;
          $log.debug('ContextService.objectedSelected - broadcast event');
          $rootScope.$broadcast('objectSelected', selectedObject);
        }
      });
      */
    };

    var getSelectedObject = function () {
      return selectedObject;
    };

    return {
      setSelectedObject: setSelectedObject,
      updateSelectedObject: updateSelectedObject,
      getSelectedObject: getSelectedObject
    };
  });
