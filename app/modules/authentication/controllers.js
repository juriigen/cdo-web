'use strict';

angular.module('Authentication')

  .controller('LoginController',
  ['$scope', '$rootScope', '$location', 'toaster', 'AuthenticationService',
    function ($scope, $rootScope, $location, toaster, AuthenticationService) {
      // reset login status
      AuthenticationService.ClearCredentials();

      $scope.login = function () {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function (data, status) {
          if (status === 200) {
            toaster.pop('success', 'Authentication ok', 'Welcome ' + $scope.username);
            $rootScope.$broadcast('repoRootNodeUpdated', data);
            AuthenticationService.SetCredentials($scope.username, $scope.password);
            $location.path('/governance');
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
