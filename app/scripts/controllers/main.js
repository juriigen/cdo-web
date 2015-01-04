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
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
