'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:GovemployeesCtrl
 * @description
 * # GovemployeesCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('GovemployeesCtrl', ['$scope', '$log', 'RepoAccessService', 'CalculateUrlService', 'ContextService',  function (scope, log, RepoAccessService, CalculateUrlService, ContextService) {
    log.info("GovemployeesCtrl")

    scope.rowCollection = [];

    RepoAccessService.get('/obj/repo/governance.Employee?rrefs', function (data, status) {

      if (status === 200) {
        var result = data.data

        for (var j = 0; j < result.length; j++) {

          var entry = {};
          entry.icon = CalculateUrlService.getUrl(result[j].icon);
          entry.name = result[j].attributes.name;
          entry.firstName = result[j].attributes.firstName;
          entry.PID = result[j].attributes.PID;
          entry.oe = result[j].attributes.oeCode;
          entry.url = result[j]._links.self.href;
          scope.rowCollection.push(entry);
        }

      } else {

      }

    });

    scope.setNewObject = function(url) {
      ContextService.setSelectedObject(url);
    };

  }]);
