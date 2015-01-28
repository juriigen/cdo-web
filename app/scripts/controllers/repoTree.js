'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:RepoTreeCtrl
 * @description
 * # RepoTreeCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('RepoTreeCtrl', function ($rootScope, $scope, $log, TreeModelService, RepoAccessService, ContextService) {

    /**
     * The repository tree controller holds all functions
     */
    var repoTree = this;

    repoTree.treeData = [];

    var treeReady = false;

    repoTree.isReady = function () {
      return treeReady;
    };

    repoTree.treeConfig = {
      core: {
        multiple: false,
        animation: true,
        error : function(error) {
          $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
        },
        themes: {
          dots: false,
          variant: 'small'
        },
        /* jshint camelcase:false */
        check_callback: true,
        /* jshint camelcase:true */
        worker: true
      },
      plugins: ['wholerow', 'sort']
    };


    /**********************************************************************
     * jsTree event callbacks
     */

    /**
     * Load's the repo root resource and fires
     * notification 'repoRootNodeUpdated'
     * with root node with direct containment
     * references
     */
    repoTree.readyCB = function () {

      if ($rootScope.globals.currentUser !== undefined) {
        // page reload
        RepoAccessService.get('/node?crefs&meta', function (data, status) {
          if (status === 200) {
            $scope.$broadcast('repoRootNodeUpdated', data);
          } else {
            repoTree.status = 'Technical problem loading /node';
          }
        });
      }
    };

    repoTree.selectNodeCB = function (e, item) {
      var node = repoTree.getNode(item.node.id);
      $log.debug('EVENT - select node - ' + node.url);
      if (repoTree.selectedObject === undefined || repoTree.selectedObject.id !== node.id) {

        repoTree.setSelectedObject(node.url);
      }
    };


    repoTree.setSelectedObject = function(url, resetStatus) {

      var reset = true;
      if (resetStatus !== undefined) {
        reset = resetStatus;
      }
      if (reset) {
        repoTree.resetStatus();
      }

      ContextService.setSelectedObject(url, function (data, status) {
        if (status === 404) {
          repoTree.removeNode(repoTree.selectedObject.id);
          repoTree.status = status + ' - ' + data.error.message;
          ContextService.updateSelectedObject(undefined);
        } else if (status !== 200) {
          repoTree.status = 'Technical problem loading ' + repoTree.selectedObject._links.self.href;
        }
      });

    };

    repoTree.indexOfItem = function(id) {
      for(var i = 0, len = repoTree.treeData.length; i < len; i++) {
        if (repoTree.treeData[i].id === (id.toString())) {
          return i;
        }
      }
      return -1;
    };

    repoTree.getNode = function(id) {
      var index = repoTree.indexOfItem(id);
      if (index > -1) {
        return repoTree.treeData[repoTree.indexOfItem(id)];
      } else {
        return undefined;
      }
    };

    repoTree.removeNode = function(id) {
      $log.debug('RepoTreeCtrl.removeNode - id ' + id);
      var index = -1;
      repoTree.treeData.forEach(function(entry) {
        index++;
        if (entry.id === (id.toString())) {
          $log.debug('>> found node - ' + id);
          repoTree.treeData.splice(index, 1);
        }
      });
    };

    repoTree.possibleTypes = function () {
      var types = [];
      if (repoTree.selectedObject !== undefined && repoTree.selectedObject.meta !== undefined &&repoTree.selectedObject.meta.references !== undefined) {
        repoTree.selectedObject.meta.references.forEach(function (entry) {
          if (repoTree.selectedObject.containment !== undefined && entry.feature === repoTree.selectedObject.containment.feature) {

            if (entry.abstract === false && entry.type) {
              types.push(entry.type);
            }
            if (entry.extendedFrom !== undefined) {
              entry.extendedFrom.forEach(function (exType) {
                types.push(exType);
              });
            }
          }
        });
        types.sort(function (a, b) {
          var x = a;
          var y = b;
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });

        if (repoTree.selectedObject.objectType === undefined || types.indexOf(repoTree.selectedObject.objectType) <= 0) {
          repoTree.selectedObject.objectType = types[0];

        }
      }
      return types;
    };

    repoTree.addNode = function() {
      $log.debug('RepoTreeCtrl.addNode ' + repoTree.selectedObject.objectType + ' to ' + repoTree.selectedObject.id);
      var newObject = { type: repoTree.selectedObject.objectType };

      if (repoTree.selectedObject.objectType.indexOf('eresource.CDOResource') === 0) {
        newObject.attributes = { name: 'NEW RESOURCE'};
      }

      repoTree.dataLoading = true;
      RepoAccessService.post(repoTree.selectedObject._links.self.href + '/references/' + repoTree.selectedObject.containment.feature + '?rrefs&meta', newObject, function (data, status) {
        if (status === 201) {
          var newNode = TreeModelService.transformObject(data.data, repoTree.selectedObject.id);

          newNode.state = {selected: true};
          repoTree.treeData.push(newNode);

          repoTree.addNodeStatus = data.status;

          var currentSelectedNode = repoTree.getNode(repoTree.selectedObject.id);
          repoTree.treeInstance.jstree('deselect_node', currentSelectedNode);

          // set the new created object as context for repo tree
          repoTree.setSelectedObject(newNode.url, false);

          repoTree.dataLoading = false;
        } else if (status === 409) {
            repoTree.addNodeStatusFailed = status + ' - ' + data.error.message + ' : ' + newObject.attributes.name;
            repoTree.dataLoading = false;
        } else {
          repoTree.addNodeStatusFailed = 'Technical problem post ' + repoTree.selectedObject._links.self.href + '/references/' + repoTree.selectedObject.containment.feature;
          repoTree.dataLoading = false;
        }
      });
    };

    repoTree.showAddNodeSuccess = function () {
      if (repoTree.addNodeStatus !== undefined && repoTree.addNodeStatus.revisionDeltas.length > 0) {
        return true;
      }
      return false;
    };

    repoTree.closeAddNodeSuccess = function () {
      repoTree.addNodeStatus = undefined;
    };

    repoTree.closeAddNodeFailed = function () {
      repoTree.addNodeStatusFailed = undefined;
    };

    repoTree.deleteNode = function() {
      $log.debug('RepoTreeCtrl.removeNode - ' + repoTree.selectedObject.id);

      repoTree.dataLoading2 = true;
      RepoAccessService.delete(repoTree.selectedObject._links.self.href, function (data, status) {
        if (status === 200) {

          repoTree.removeNode(repoTree.selectedObject.id);
          ContextService.updateSelectedObject(undefined);

          repoTree.removeNodeStatus = data.status;
          repoTree.dataLoading2 = false;

        } else if (status === 409) {
          repoTree.removeNodeStatusFailed = status + ' - ' + data.error.message;
          repoTree.dataLoading2 = false;
        } else {
          repoTree.removeNodeStatusFailed = 'Technical problem delete ' + repoTree.selectedObject._links.self.href + '/references/' + repoTree.selectedObject.containment.feature;
          repoTree.dataLoading2 = false;
        }
      });
    };

    repoTree.showRemoveNodeSuccess = function () {
      if (repoTree.removeNodeStatus !== undefined && repoTree.removeNodeStatus.revisionDeltas.length > 0) {
        return true;
      }
      return false;
    };

    repoTree.closeRemoveNodeSuccess = function () {
      repoTree.removeNodeStatus = undefined;
    };

    repoTree.closeRemoveNodeFailed = function () {
      repoTree.removeNodeStatusFailed = undefined;
    };


    repoTree.applyModelChanges = function () {
      $log.debug('RepoTreeCtrl.applyModelChanges');
      return true;
    };

    repoTree.beforeOpenNodeCB = function (e, item) {
      $log.debug('RepoTreeCtrl.beforeOpenNodeCB - ' + item.node.id);
    };

    repoTree.afterCloseNodeCB = function (e, item) {
      $log.debug('RepoTreeCtrl.afterCloseNodeCB - ' + item.node.id);
      repoTree.getNode(item.node.id).state.opened = false;
    };

    repoTree.resolveChildren = function(parentNode) {
      $log.debug('>> resolve childen');
      RepoAccessService.get(parentNode.url + '/references?crefs&meta', function (data, status) {
        if (status === 200) {

          var children = TreeModelService.transformChildren(data.data, parentNode.id);
          children.forEach(function (node) {
            repoTree.treeData.push(node);
          });
          parentNode.resolved = true;
        } else if (status === 404) {
          parentNode.resolved = true;
        } else {
          repoTree.status = 'Technical problem loading ' + parentNode.url;
        }
      });
    };

    repoTree.openNodeCB = function (e, item) {
      $log.debug('RepoTreeCtrl.openNodeCB - ' + item.node.id);

      repoTree.treeData.forEach(function (entry) {
        if (entry.parent.id === item.node.id && entry.resolved === false) {
          repoTree.resolveChildren(entry);
        }
      });
      repoTree.getNode(item.node.id).state.opened = true;
    };

    // either login or reload is triggered
    $scope.$on('repoRootNodeUpdated', function (scope, data) {

      treeReady = false;

      $log.debug('RepoTreeCtrl.repoRootNodeUpdated - received event');

      repoTree.treeData.length = 0;

      if (data.data.references.contents !== undefined) {
        var children = TreeModelService.transformChildren(data.data.references.contents, '#');
        children.forEach(function (node) {
          repoTree.treeData.push(node);
          repoTree.resolveChildren(node);
        });
      }

      treeReady = true;
    });

    $scope.$on('objectSelected', function(scope, data) {
      if (repoTree.selectedObject !== undefined && repoTree.selectedObject.id !== data.id) {
        var oldSelectedNode = repoTree.getNode(repoTree.selectedObject.id);
        repoTree.treeInstance.jstree('deselect_node', oldSelectedNode);

        var newSelectedNode = repoTree.getNode(data.id);
        if (newSelectedNode !== undefined) {
          repoTree.treeInstance.jstree('select_node', newSelectedNode);
        }
      }

      repoTree.selectedObject = data;

      repoTree.selectedObject.containments = [];
      if (repoTree.selectedObject.meta.references !== undefined) {
        repoTree.selectedObject.meta.references.forEach(function (entry) {
          if (entry.containment) {
            $log.debug('>> found containment meta - ' + entry.feature);
            repoTree.selectedObject.containments.push(entry);
          }
        });
        repoTree.selectedObject.containments.sort(function (a, b) {
          var x = a;
          var y = b;
          return ((x < y) ? -1 : ((x > y) ? 0 : 1));
        });

        repoTree.selectedObject.containment = repoTree.selectedObject.containments[0];
      }


    });

    $scope.$on('updateSelectedObject', function (scope, data) {

      $log.debug('RepoTreeCtrl.updateSelectedObject - received event');

      var parent = {};
      // if undefined, node was deleted!
      if (data !== undefined) {
        var node = repoTree.getNode(data.id);

        if (node.parent.id !== (data.containerId.toString())) {
          // node was moved
          node.data = data;
          node.parent.id = data.containerId.toString();
          node.state.selected = true;
          repoTree.refresh();
          // node was renamed
        } else {
          parent = node.parent;

          var newLabel = data.label;
          if (data.type === 'eresource.CDOResourceFolder') {
            newLabel = data.attributes.name;
          }
          node.data = data;
          repoTree.treeInstance.jstree('rename_node', node, newLabel);

          // remove all child and then force re sort
          var index = -1;
          var size = 0;
          var startIndex = -1;
          var startFound = false;
          repoTree.treeData.forEach(function (entry) {
            index++;
            if (entry.parent.id === (parent.id.toString())) {
              size++;
              if (startFound !== true) {
                startIndex = index;
                startFound = true;
              }
              $log.debug('>> Found node to resfresh - ' + entry.text + ' ' + index);
            }
          });
          $log.debug('>> to splice for sort - start - ' + startIndex + ' size ' + size);
          var toSort = repoTree.treeData.splice(startIndex, size);

          toSort.forEach(function(entry) {
            repoTree.treeData.push(entry);
          });
        }
      }
    });

    repoTree.refresh = function() {
      var refreshedNodes = [];

      var temp = repoTree.treeData.splice(0, repoTree.treeData.length);
      temp.forEach(function (entry) {
        var freshNode = {};
        freshNode.id = entry.id.toString();
        freshNode.parent = entry.parent;
        freshNode.text = entry.text;
        freshNode.state = entry.state;
        freshNode.icon = entry.icon;
        freshNode.url = entry.url;
        freshNode.resolved = entry.resolved;
        /* jshint camelcase:false */
        freshNode.li_attr = entry.li_attr;
        /* jshint camelcase:true */
        freshNode.data = entry.data;
        refreshedNodes.push(freshNode);
      });

      refreshedNodes.forEach(function(entry) {
        $log.debug(JSON.stringify(entry));
        repoTree.treeData.push(entry);
      });
    };

    repoTree.closeAlert = function () {
      repoTree.status = undefined;
    };

    repoTree.resetStatus = function() {
      repoTree.status = undefined;

      repoTree.addNodeStatusFailed = undefined;
      repoTree.addNodeStatus = undefined;

      repoTree.removeNodeStatus = undefined;
      repoTree.removeNodeStatusFailed = undefined;
    };
  });
