'use strict';

/**
 * @ngdoc service
 * @name cdoWebApp.RepoAccessService
 * @description
 * # RepoAccessService
 * Service in the cdoWebApp.
 */
angular.module('cdoWebApp')
  .service('RepoAccessService', function ($http, $log, CalculateUrlService) {
    var service = {};

    service.get = function (relativeUrl, callback) {
      var url = CalculateUrlService.getUrl(relativeUrl);
      $http.get(url)
        .success(function (data, status) {

          $log.debug('RepoAccessService.get - ' + url + ' - status ' + status);

          callback(data, status);
        })
        .error(function (data, status) {

          $log.debug('RepoAccessService.get - ' + url + ' - status ' + status);

          callback(data, status);
        });
    };

    service.put = function (relativeUrl, object, callback) {
      var url = CalculateUrlService.getUrl(relativeUrl);
      $http.put(url, object)
        .success(function (data, status) {

          $log.debug('RepoAccessService.put - ' + url + ' - status ' + status);

          callback(data, status);
        })
        .error(function (data, status) {

          $log.debug('RepoAccessService.put - ' + url + ' - status ' + status);

          callback(data, status);
        });
    };

    service.post = function (relativeUrl, object, callback) {
      var url = CalculateUrlService.getUrl(relativeUrl);
      $http.post(url, object)
        .success(function (data, status) {

          $log.debug('RepoAccessService.post - ' + url + ' - status ' + status);

          callback(data, status);
        })
        .error(function (data, status) {

          $log.debug('RepoAccessService.post - ' + url + ' - status ' + status);

          callback(data, status);
        });
    };

    service.delete = function (relativeUrl, callback) {
      var url = CalculateUrlService.getUrl(relativeUrl);
      $http.delete(url)
        .success(function (data, status) {

          $log.debug('RepoAccessService.delete - ' + url + ' - status ' + status);

          callback(data, status);
        })
        .error(function (data, status) {

          $log.debug('RepoAccessService.delete - ' + url + ' - status ' + status);

          callback(data, status);
        });
    };
    return service;
  });
