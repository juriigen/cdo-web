'use strict';

/**
 * @ngdoc service
 * @name cdoWebApp.CalculateUrlService
 * @description
 * # CalculateUrlService
 * Service in the cdoWebApp.
 */
angular.module('cdoWebApp')
  .service('CalculateUrlService', function ($rootScope) {
    var service = {};
    service.getUrl = function (relativeUrl) {

      return "http://ec2-3-135-222-107.us-east-2.compute.amazonaws.com:8080" + relativeUrl;
    };
    return service;
  });
