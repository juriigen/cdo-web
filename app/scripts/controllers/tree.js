'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:TreeCtrl
 * @description
 * # TreeCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('TreeCtrl', function ($scope) {
    var newId = 0;
    var vm = this;

    vm.newNode = {};

    vm.treeConfig = {
      core : {
        multiple : false,
        animation: true,
        themes : {
          dots : false
        },
        check_callback : true,
        worker : true
      },
      plugins : [ 'wholerow' ],
      version : 1
    };

    vm.readyCB = function() {
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
      console.log('node openend ' + item.node.text);
    };

    vm.addNewNode = function() {
      vm.treeData.push({ id : (newId++).toString(), parent : vm.newNode.parent, text : vm.newNode.text });
    };

    vm.treeData = [
      { id : 'root', parent : '#', text : 'Root', state: { opened: false} }
    ];

    $scope.$on('repoRootNodeUpdated', function (scope, data) {
      console.log('tree ' + data.status.status);
    });
  });


