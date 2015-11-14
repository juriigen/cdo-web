'use strict';

describe('Controller: GovfamiliesCtrl', function () {

  // load the controller's module
  beforeEach(module('cdoWebApp'));

  var GovfamiliesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GovfamiliesCtrl = $controller('GovfamiliesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
