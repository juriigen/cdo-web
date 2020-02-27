'use strict';

angular.module('Authentication')

  .controller('LoginController',
    ['$scope', '$rootScope', '$location', '$log', 'toaster', 'AuthenticationService',
      function ($scope, $rootScope, $location, $log, toaster, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.rendpoint = $rootScope.endpoint;


        $scope.login = function () {
          $scope.dataLoading = true;
          //$rootScope.endpoint = document.location.origin;
          $rootScope.endpoint = $scope.rendpoint;
          $log.debug('Repo Endpoint - ' + $rootScope.endpoint);

          AuthenticationService.Login($scope.username, $scope.password, function (data, status) {
            if (status === 200) {
              toaster.pop('success', 'Authentication ok', 'Welcome ' + $scope.username);
              $rootScope.$broadcast('repoRootNodeUpdated', data);
              AuthenticationService.SetCredentials($scope.username, $scope.password);
              $location.path('/repo');
            } else {
              $scope.error = data.message;
              $scope.dataLoading = false;
            }
          });
        };
        $scope.closeAlert = function () {
          $scope.error = false;
        };
      }]);
