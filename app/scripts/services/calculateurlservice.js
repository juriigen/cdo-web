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

      return $rootScope.endpoint + relativeUrl;
    };
    return service;
  });
