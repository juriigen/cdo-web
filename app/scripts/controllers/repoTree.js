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

    var repoTree = this;

    repoTree.root = {};
    repoTree.treeData = [];


    var treeReady = false;

    repoTree.isReady = function () {
      $log.debug('RepoTreeCtrl.isReady - ' + treeReady);
      return treeReady;
    };

    repoTree.treeConfig = {
      core: {
        multiple: false,
        animation: true,
        themes: {
          dots: false,
          variant: 'small'
        },
        /* jshint camelcase:false */
        check_callback: true,
        /* jshint camelcase:true */
        worker: true
      },
      plugins: ['wholerow']
    };

    repoTree.readyCB = function () {
      $log.debug('RepoTreeCtrl.readyCB');

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
      repoTree.selectedObject = item.node.data;
      $log.debug('RepoTreeCtrl.selectNodeCB - ' + item.node.id);

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

      ContextService.setSelectedObject(repoTree.selectedObject._links.self.href, function (data, status) {
        if (status === 404) {
          repoTree.removeNode(repoTree.selectedObject.id);
          repoTree.status = status + ' - ' + data.error.message;
          ContextService.updateSelectedObject(undefined);
        } else if (status !== 200) {
          repoTree.status = 'Technical problem loading ' + repoTree.selectedObject._links.self.href;
        }
      });
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
      $log.debug('RepoTreeCtrl.possibleTypes');
      var types = [];
      if (repoTree.selectedObject !== undefined && repoTree.selectedObject.meta.references !== undefined) {
        repoTree.selectedObject.meta.references.forEach(function (entry) {
          if (entry.feature === repoTree.selectedObject.containment.feature) {
            $log.debug(' >> search types for feature - ' + entry.feature);

            if (entry.abstract === false && entry.type) {
              $log.debug(' >> add type - ' + entry.type);
              types.push(entry.type);
            }
            if (entry.extendedFrom !== undefined) {
              entry.extendedFrom.forEach(function (exType) {
                $log.debug(' >> add extended from type - ' + exType);
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
      RepoAccessService.post(repoTree.selectedObject._links.self.href + '/references/' + repoTree.selectedObject.containment.feature + '?rrefs&meta', newObject, function (data, status) {
        if (status === 201) {
          var newNode = TreeModelService.transformObject(data.data, repoTree.selectedObject.id);
          repoTree.treeData.push(newNode);

          ContextService.setSelectedObject(newNode.data._links.self.href, function (data, status) {
            if (status === 404) {
              repoTree.removeNode(repoTree.selectedObject.id);
              repoTree.status = status + ' - ' + data.error.message;
              ContextService.updateSelectedObject(undefined);
            } else if (status !== 200) {
              repoTree.status = 'Technical problem loading ' + repoTree.selectedObject._links.self.href;
            }
          });

        } else {
          repoTree.status = 'Technical problem posting ' + repoTree.selectedObject._links.self.href + '/references/' + repoTree.selectedObject.containment.feature;
        }
      });
    };

    repoTree.applyModelChanges = function () {
      $log.debug('RepoTreeCtrl.applyModelChanges');
      return true;
    };

    repoTree.beforeOpenNodeCB = function (e, item) {
      $log.debug('RepoTreeCtrl.beforeOpenNodeCB - ' + item.node.id);
    };

    repoTree.openNodeCB = function (e, item) {
      $log.debug('RepoTreeCtrl.openNodeCB - ' + item.node.id);

      repoTree.treeData.forEach(function (entry) {
        if (entry.parent.id === item.node.id && entry.resolved === false) {
          $log.debug('>> resolve childen');

          RepoAccessService.get(entry.url + '/references?crefs&meta', function (data, status) {
            if (status === 200) {

              var children = TreeModelService.transformChildren(data.data, entry.id);
              children.forEach(function (node) {
                repoTree.treeData.push(node);
              });
              entry.resolved = true;
            } else if (status === 404) {
              entry.resolved = true;
            } else {
              repoTree.status = 'Technical problem loading ' + entry.url;
            }
          });
        }
      });
    };

    // either login or reload is triggered
    $scope.$on('repoRootNodeUpdated', function (scope, data) {

      treeReady = false;

      $log.debug('RepoTreeCtrl.repoRootNodeUpdated - received event');

      repoTree.treeData.length = 0;

      repoTree.root = data.data;

      if (data.data.references.contents !== undefined) {
        var children = TreeModelService.transformChildren(data.data.references.contents, '#');
        children.forEach(function (node) {
          repoTree.treeData.push(node);
          RepoAccessService.get(node.url + '/references?crefs&meta', function (data, status) {
            if (status === 200) {

              var children = TreeModelService.transformChildren(data.data, node.id);
              children.forEach(function (node) {
                repoTree.treeData.push(node);
              });
              node.resolved = true;
            } else if (status === 404) {
              node.resolved = true;
            } else {
              repoTree.status = 'Technical problem loading ' + node.url;
            }
          });
        });
      }

      treeReady = true;
    });

    $scope.$on('updateSelectedObject', function (scope, data) {

      $log.debug('RepoTreeCtrl.updateSelectedObject - received event');

      // if undefined, node was deleted!
      if (data !== undefined) {
        repoTree.treeData.forEach(function (entry) {

          if (entry.id === (data.id.toString())) {
            $log.debug('>> Found node to update - ' + data.id);

            var newLabel = data.label;
            if (data.type === 'eresource.CDOResourceFolder') {
              newLabel = data.attributes.name;
            }
            entry.data = data;
            repoTree.treeInstance.jstree('rename_node', entry, newLabel);
            //entry.text = newLabel;
          }
        });
      }
    });

    repoTree.closeAlert = function () {
      repoTree.status = undefined;
    };

    $scope.$on('objectSelected', function () {
      repoTree.status = undefined;
      $log.debug('TreeCtrl.objectSelected - reset status');
    });
  });
