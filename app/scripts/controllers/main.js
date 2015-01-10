'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('MainCtrl', function ($scope) {
    var main = this;
    $scope.$on('objectSelected', function (scope, data) {
      main.selectedObject = data;
      console.log('MainCtrl.selectedObject = ' + main.selectedObject.id);
    });
  });
