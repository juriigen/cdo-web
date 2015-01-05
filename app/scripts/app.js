'use strict';

var endpoint = 'https://cdo-flatland.rhcloud.com'

// declare modules
angular.module('Authentication', []);

/**
 * @ngdoc overview
 * @name cdoWebApp
 * @description
 * # cdoWebApp
 *
 * Main module of the application.
 */
angular
  .module('cdoWebApp', [
    'Authentication',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngJsTree'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'modules/authentication/views/login.html',
        hideMenus: true
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });

  })
  .config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
  })
  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          $location.path('/login');
        }
      });
    }]);
