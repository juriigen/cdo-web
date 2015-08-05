'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:GovfamiliesCtrl
 * @description
 * # GovfamiliesCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('GovfamiliesCtrl', ['$scope', '$log', 'RepoAccessService', 'CalculateUrlService', 'ContextService',  function (scope, log, RepoAccessService, CalculateUrlService, ContextService) {
    log.debug("GovfamiliesCtrl")

    scope.rowCollection = [];

    RepoAccessService.get('/obj/repo/governance.DataFamily', function (data, status) {

      if (status === 200) {
        var result = data.data

        for (var j = 0; j < result.length; j++) {

          var entry = {};
          entry.icon = CalculateUrlService.getUrl(result[j].icon);
          entry.name = result[j].attributes.name;
          entry.description = result[j].attributes.description;
          entry.url = result[j]._links.self.href;
          if (result[j]._links.references.governanceAttributes !== undefined) {
            entry.owns = result[j]._links.references.governanceAttributes.size;
          } else {
            entry.owns = 0;
          }
          scope.rowCollection.push(entry);
        }

      } else {

      }

    });

    scope.setNewObject = function(url) {
      ContextService.setSelectedObject(url);
    };

  }]);
