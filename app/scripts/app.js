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
    'toaster',
    'naif.base64'
  ])
  .filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span class="highlighted">$1</span>')

      return $sce.trustAsHtml(text)
    }
  })
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
      .state('search', {
        url: '/search',
        controller: 'SearchCtrl',
        templateUrl: 'views/search.html'
      })
      .state('repo.json', {
        url: '/json'
      });

  })
  .config(['$httpProvider', function ($httpProvider) {
    // enable http caching
    $httpProvider.defaults.cache = false;
  }])
  .config(function ($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.withCredentials = true;
  })
  .config(function($logProvider){
    //$logProvider.debugEnabled(false);
    $logProvider.debugEnabled(true);
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
      //$rootScope.endpoint = 'https://cdo-flatland.rhcloud.com';
      //$rootScope.endpoint = 'http://192.168.0.127';
      //$rootScope.endpoint = 'https://63fd9c1b.ngrok.com';
      $rootScope.endpoint = 'http://localhost:8080';
      $rootScope.repository = 'repo/';
      //$rootScope.endpoint = 'https://swisscom.3ap.ch';
      $rootScope.dateFormat = 'dd MMMM yyyy - HH:mm:ss';
    }]);
