'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:GovareasCtrl
 * @description
 * # GovareasCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('GovareasCtrl', ['$scope', '$log', 'RepoAccessService', 'CalculateUrlService',  function (scope, log, RepoAccessService, CalculateUrlService) {
    log.info("GovareasCtrl")

    scope.rowCollection = [];

    RepoAccessService.get('/obj/repo/governance.OwnerShipArea?rrefs', function (data, status) {

      if (status === 200) {
        var result = data.data

        for (var j = 0; j < result.length; j++) {

          var entry = {};
          entry.icon = CalculateUrlService.getUrl(result[j].icon);
          entry.name = result[j].attributes.name;
          entry.description = result[j].attributes.description;

          scope.rowCollection.push(entry);
        }

      } else {

      }

    });

  }]);
