'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:TreeCtrl
 * @description
 * # TreeCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('TreeCtrl', function ($rootScope, $scope, TreeModelService, RepoAccessService) {
    var newId = 0;
    var vm = this;

    vm.newNode = {};

    vm.treeConfig = {
      core : {
        multiple : false,
        animation: true,
        themes : {
          dots : false
          //variant: 'small'
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
      if ($rootScope.globals.currentUser !== undefined) {
        RepoAccessService.get('/node?crefs', function (data, status) {
          if (status === 200) {
            vm.treeData.length = 0;
            var root = TreeModelService.transformRoot(data.data);
            vm.treeData.push(root);

            var children = TreeModelService.transformChildren(data.data.references.contents, root.id);
            children.forEach(function(node) {
              vm.treeData.push(node);
            });
          }
        });
      }

      console.log('ready called');
    };

    vm.selectNodeCB = function(e, item) {
      vm.newNode.parent = item.node;
      //vm.newNode.text = 'new'
      //vm.addNewNode();
      $scope.$apply();
      console.log('node selected ' + item.node.text + ' and set newNode.parent to ' + vm.newNode.parent.id);
    };

    vm.applyModelChanges = function() {
      console.log('Apply Changes Mode');
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
      console.log('before node openend ' + item.node.text);
    };

    vm.openNodeCB = function(e, item) {
      console.log('node openend ' + item.node.text + ' ' + item.node.id);

      vm.treeData.forEach(function(entry) {
        if (entry.parent.id === item.node.id && entry.resolved === false) {
          console.log(' has child ' + entry.text + ' ' + entry.id);
          RepoAccessService.get(entry.url + '/references?crefs', function (data, status) {
            if (status === 200) {

              var children = TreeModelService.transformChildren(data.data, entry.id);
              children.forEach(function(node) {
                vm.treeData.push(node);
              });
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
      // create repo root
      vm.treeData.length = 0;
      var root = TreeModelService.transformRoot(data.data);
      vm.treeData.push(root);

      var children = TreeModelService.transformChildren(data.data.references.contents, root.id);
      children.forEach(function(node) {
        vm.treeData.push(node);
      });
    });

  });
