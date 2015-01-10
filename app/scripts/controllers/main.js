'use strict';

/**
 * @ngdoc function
 * @name cdoWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cdoWebApp
 */
angular.module('cdoWebApp')
  .controller('MainCtrl', function () {
    var main = this;
    main.selectedObject = { id: 'test'};
  });
