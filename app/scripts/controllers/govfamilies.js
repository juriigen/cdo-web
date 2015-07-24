'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:GovfamiliesCtrl
 * @description
 * # GovfamiliesCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('GovfamiliesCtrl', ['$scope', '$log', 'RepoAccessService', 'CalculateUrlService',  function (scope, log, RepoAccessService, CalculateUrlService) {
    log.info("GovfamiliesCtrl")

    scope.rowCollection = [];

    RepoAccessService.get('/obj/repo/governance.DataFamily?rrefs', function (data, status) {

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
