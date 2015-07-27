'use strict';

describe('Controller: IfmsbulkCtrl', function () {

  // load the controller's module
  beforeEach(module('cdoWebApp'));

  var IfmsbulkCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IfmsbulkCtrl = $controller('IfmsbulkCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
