'use strict';

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
    'ui.bootstrap',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngJsTree',
    'toaster'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/login');

    // Now set up the states
    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'modules/authentication/views/login.html'
      })
      .state('repo', {
        url: '/repo',
        controller: 'RepoCtrl',
        templateUrl: 'views/repo.html'
      })
      .state('repo.meta', {
        url: '/meta'
      });

  })
  .config(function ($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.withCredentials = true;
  })
  .config(function($logProvider){
    $logProvider.debugEnabled(false);
    //$logProvider.debugEnabled(true);
  })
  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function () {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          $location.path('/login');
        }
      });

      /* Global Variables */
      $rootScope.endpoint = 'https://cdo-flatland.rhcloud.com';
      //$rootScope.endpoint = 'https://localhost:9080';
      $rootScope.dateFormat = 'dd MMMM yyyy - HH:mm:ss';
    }]);
