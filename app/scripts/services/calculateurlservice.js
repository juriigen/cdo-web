'use strict';

/**
 * @ngdoc service
 * @name cdoWebApp.CalculateUrlService
 * @description
 * # CalculateUrlService
 * Service in the cdoWebApp.
 */
angular.module('cdoWebApp')
  .service('CalculateUrlService', function () {
    var service = {};
    service.getUrl = function(relativeUrl) {
      /* global endpoint:true */
      return endpoint + relativeUrl;
    };
    return service;
  });
