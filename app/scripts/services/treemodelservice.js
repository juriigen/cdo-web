'use strict';

/**
 * @ngdoc service
 * @name cdoWebApp.TreeModelService
 * @description
 * # TreeModelService
 * Service in the cdoWebApp.
 */
angular.module('cdoWebApp')
  .service('TreeModelService', function (CalculateUrlService) {

    var service = {};
    service.transform = function(data, parent) {
      var params = '?crefs';
      var array = [];
      var node = {};
      node.id = data.data.id.toString();
      node.parent = parent;
      if (parent === '#') {
        node.text = '/node';
      } else {
        node.text = data.data.label;
      }
      node.state = { opened : false};
      node.icon = CalculateUrlService.getUrl(data.data.icon + 'Folder');
      node.url = data.data._links.self.href + params;
      array.push(node);

      /* global jsonPath:true */
      /* jshint evil:true */
      var containmentRefs = jsonPath.eval(data.data.references, '*')[0];

      containmentRefs.forEach(function(entry) {
        var child = {};
        child.id = entry.id.toString();
        child.parent = { id: node.id };
        child.text = entry.label;
        child.state = { opened : false};
        child.icon = CalculateUrlService.getUrl(entry.icon);
        child.url = entry._links.self.href + params;
        array.push(child);
      });
      console.log('TreeModelService ' + JSON.stringify(array));
      return array;
    };
    return service;
  });
