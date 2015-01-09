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
    service.transformRoot = function(object) {
      var root = {};
      root.id = object.id.toString();
      root.parent = '#';
      root.text = '/node';
      root.state = { opened : false};
      root.icon = CalculateUrlService.getUrl(object.icon + 'Folder');
      root.url = object._links.self.href;
      root.resolved = true;
      if (object.permission === 'READ') {
        root.li_attr = {class: 'readpermission'};
      } else {
        root.li_attr = {class: 'writepermission'};
      }
      console.log('TreeModelService.root ' + JSON.stringify(root));
      return root;
    };

    service.transformChildren = function(children, parentId) {
      var array = [];

      children.forEach(function(entry) {
        var child = {};
        child.id = entry.id.toString();
        child.parent = { id: parentId };
        child.text = entry.label;
        child.state = { opened : false};
        if (entry.icon === '/icon/eresource.CDOResource') {
          child.icon =  CalculateUrlService.getUrl('/icon/security.ResourceFilter');
        } else {
          child.icon = CalculateUrlService.getUrl(entry.icon);
        }
        child.url = entry._links.self.href;
        child.resolved = false;
        if (entry.permission === 'READ') {
          console.log('children.entry ' + child.id + ' ' + entry.permission);
          child.li_attr = {class: 'readpermission'};
        } else {
          child.li_attr = {class: 'writepermission'};
        }
        array.push(child);
      });
      console.log('TreeModelService.children ' + JSON.stringify(array));
      return array.reverse();
    };
    return service;
  });