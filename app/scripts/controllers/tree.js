'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:TreeCtrl
 * @description
 * # TreeCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('TreeCtrl', function ($rootScope, $scope, $log, TreeModelService, RepoAccessService, ContextService) {
    var newId = 0;
    var vm = this;

    vm.newNode = {};

    //vm.selectedObject;

    vm.treeConfig = {
      core : {
        multiple : false,
        animation: true,
        themes : {
          dots : false,
          variant: 'small'
        },
        /* jshint camelcase:false */
        check_callback : true,
        /* jshint camelcase:true */
        worker : true
      },
      plugins : [ 'wholerow' ],
      version : 1
    };

    vm.readyCB = function() {
      $log.debug('TreeCtrl.readyCB');

      if ($rootScope.globals.currentUser !== undefined) {

        RepoAccessService.get('/node?crefs', function (data, status) {
          if (status === 200) {
            vm.treeData.length = 0;

            if (data.data.references.contents !== undefined) {

              var children = TreeModelService.transformChildren(data.data.references.contents, '#');
              children.forEach(function(node) {
                vm.treeData.push(node);

                RepoAccessService.get(node.url + '/references?crefs', function (data, status) {
                  if (status === 200) {

                    var children = TreeModelService.transformChildren(data.data, node.id);
                    children.forEach(function(node) {
                      vm.treeData.push(node);
                    });
                    node.resolved = true;
                  } else if (status === 404) {
                    node.resolved = true;
                  }
                });
              });
            }
          }
        });
      }
    };

    vm.selectNodeCB = function(e, item) {
      vm.selectedObject = item.node.data;
      $log.debug('TreeCtrl.selectNodeCB - ' + item.node.id);
      ContextService.setSelectedObject(vm.selectedObject);

      //$scope.$apply();
    };

    vm.applyModelChanges = function() {
      $log.debug('TreeCtrl.applyModelChanges');
      return true;
    };

    vm.isAddNodeDisabled = function() {
      if (vm.newNode.parent === undefined) {
        return true;
      }
      if (vm.newNode.text === undefined) {
        return true;
      }
      return false;
    };

    vm.beforeOpenNodeCB = function(e, item) {
      $log.debug('TreeCtrl.beforeOpenNodeCB - ' + item.node.id);
    };

    vm.openNodeCB = function(e, item) {
      $log.debug('TreeCtrl.openNodeCB - ' + item.node.id);

      vm.treeData.forEach(function(entry) {
        if (entry.parent.id === item.node.id && entry.resolved === false) {
          $log.debug('>> resolve childen');

          RepoAccessService.get(entry.url + '/references?crefs', function (data, status) {
            if (status === 200) {

              var children = TreeModelService.transformChildren(data.data, entry.id);
              children.forEach(function(node) {
                vm.treeData.push(node);
              });
              entry.resolved = true;
            } else if (status === 404) {
              entry.resolved = true;
            }
          });
        }
      });

    };

    vm.addNewNode = function() {
      vm.treeData.push({ id : (newId++).toString(), parent : vm.newNode.parent, text : vm.newNode.text });
    };

    vm.treeData = [];

    $scope.$on('repoRootNodeUpdated', function (scope, data) {
      $log.debug('TreeCtrl.repoRootNodeUpdated - received event');

      vm.treeData.length = 0;
      var children = TreeModelService.transformChildren(data.data.references.contents, '#');
      children.forEach(function(node) {
        vm.treeData.push(node);
        RepoAccessService.get(node.url + '/references?crefs', function (data, status) {
          if (status === 200) {

            var children = TreeModelService.transformChildren(data.data, node.id);
            children.forEach(function(node) {
              vm.treeData.push(node);
            });
            node.resolved = true;
          } else if (status === 404) {
            node.resolved = true;
          }
        });
      });
    });

  });
