'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:GovattributesCtrl
 * @description
 * # GovattributesCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('GovattributesCtrl', ['$scope', '$log', 'RepoAccessService', 'CalculateUrlService', 'ContextService',  function (scope, log, RepoAccessService, CalculateUrlService, ContextService) {
    log.info("GovattributesCtrl")

    scope.rowCollection = [];

    RepoAccessService.get('/obj/repo/governance.GovernanceAttribute?rrefs', function (data, status) {

      if (status === 200) {
        var result = data.data

        for (var j = 0; j < result.length; j++) {

          var entry = {};
          entry.icon = CalculateUrlService.getUrl(result[j].icon);
          entry.id = result[j].attributes.CDA_ID;
          entry.name = result[j].attributes.name;
          entry.description = result[j].attributes.description;
          if (result[j].references.owner !== undefined) {
            entry.owner = result[j].references.owner.attributes.firstName + ' ' + result[j].references.owner.attributes.name;
          }
          if (result[j].references.deputy !== undefined) {
            entry.deputy = result[j].references.deputy.attributes.firstName + ' ' + result[j].references.deputy.attributes.name;
          }
          if (result[j].references.ownerShipArea !== undefined) {
            entry.area = result[j].references.ownerShipArea.attributes.name;
          }
          if (result[j].references.dataFamily !== undefined) {
            entry.family = result[j].references.dataFamily.attributes.name;
          }

          entry.state = result[j].attributes.lifecycleState;
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
