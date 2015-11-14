'use strict';

describe('Controller: GovemployeesCtrl', function () {

  // load the controller's module
  beforeEach(module('cdoWebApp'));

  var GovemployeesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GovemployeesCtrl = $controller('GovemployeesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
