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

    var setSelectedObject = function (newObj, callback) {

      $log.debug('ContextService.setSelectedObject - url ' + newObj);

      RepoAccessService.get(newObj + '?rrefs&meta', function (data, status) {
        if (status === 200) {
          selectedObject = data.data;
          $log.debug('ContextService.objectedSelected - broadcast event');
          if (callback !== undefined) {
            callback(data, status);
          }

          $rootScope.$broadcast('objectSelected', selectedObject, data.status);
        } else {
          callback(data, status);
        }
      });
    };

    var updateSelectedObject = function (newObj) {
      selectedObject = newObj;

      $log.debug('ContextService.updateSelectedObject - broadcast event');
      $rootScope.$broadcast('updateSelectedObject', selectedObject);

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
