'use strict';

/**
 * @ngdoc service
 * @name cdoWebApp.TreeModelService
 * @description
 * # TreeModelService
 * Service in the cdoWebApp.
 */
angular.module('cdoWebApp')
  .service('TreeModelService', function ($log, CalculateUrlService) {

    var service = {};

    service.transformObject = function(object, parentId) {
      var node = {};
      node.id = object.id.toString();
      node.parent = { id: parentId };
      if (object.type === 'eresource.CDOResourceFolder') {
        node.text = object.attributes.name;
      } else {
        node.text = object.label;
      }
      node.state = { opened : false};
      node.icon = CalculateUrlService.getUrl(object.icon);
      node.url = object._links.self.href;
      node.resolved = false;

      /* jshint ignore:start */
      if (object.permission === 'READ') {
        node.li_attr = {class: 'readpermission'};
      } else {
        node.li_attr = {class: 'writepermission'};
      }
      /* jshint ignore:end */

      return node;
    };

    service.transformChildren = function(children, parentId) {
      var array = [];

      children.forEach(function(entry) {
        var child = service.transformObject(entry, parentId);
        array.push(child);
      });

      return array.reverse();
    };
    return service;
  });
